import { InfoPanel } from '@/components/InfoPanel';
import { useData } from '@/contexts/DataContext';
import { updateUrl } from '@/utils/Url';
import { useQueryParam } from '@/utils/useQueryParam';
import { LABELS } from '@/VALUES';
import { CoPresent, Phone } from '@mui/icons-material';
import {
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';

export function BrotherInfoDialog({}) {
  const { b } = useQueryParam();
  const { brothers, spots, times, supporters, config } = useData();

  const brother = React.useMemo(() => {
    if (!b) return null;
    if (brothers.length === 0) return null;

    return brothers.find((bro) => bro.id === b);
  }, [b, brothers]);

  const shiftList = React.useMemo(() => {
    if (!brother) return [];
    const results = [];
    const assignedSpots = spots
      .map((s) => ({
        ...s,
        shifts: [s.am5, s.pm5, s.am6, s.pm6, s.am7, s.pm7],
      }))
      .filter((s) => s.shifts.includes(brother.id))
      .sort((a, b) => a.id.localeCompare(b.id));

    [5, 6, 7].forEach((day) => {
      ['am', 'pm'].forEach((time) => {
        const prop = `${time}${day}`;
        for (const s of assignedSpots) {
          if (s[prop] === brother.id) {
            results.push({
              date: LABELS[day],
              time: times[s.time][time],
              spotId: s.id,
              spotName: s.name ?? '(此地點不存在，請與監督聯絡)',
            });
          }
        }
        if (supporters[prop].includes(brother.id)) {
          const s = spots.find((s) => s.id === config['機動人員ID']);
          results.push({
            date: LABELS[day],
            time: times[s.time][time],
            spotId: s.id,
            spotName: s.name ?? '(此地點不存在，請與監督聯絡)',
          });
        }
      });
    });

    return results.map((s) => (
      <ListItemButton
        key={s.date + s.spotId + s.time}
        onClick={() =>
          updateUrl({ s: s.spotId, hash: s.spotId, b: null }, false)
        }
      >
        <ListItemText
          primary={s.date + ' ' + s.time}
          secondary={s.spotId + ' ' + s.spotName}
        />
      </ListItemButton>
    ));
  }, [brother, spots]);

  if (!b) return null;

  return (
    <InfoPanel
      open
      onClose={() => updateUrl({ b: null })}
      mobileSummary={b}
      desktopHeader={b}
      key={b}
    >
      <Divider className="my-2" />
      {!brother && (
        <DialogContentText>沒有弟兄的資料，請與聯絡監督聯絡</DialogContentText>
      )}
      <List className="p-0">
        <ListItem className="active:bg-gray-100  hover:bg-gray-100">
          <IconButton
            className="bg-blue-600 rounded-full max-w-[30px] max-h-[30px]"
            variant="contained"
            href={'tel:' + brother.phone}
            aria-label="Phone"
          >
            <Phone className="text-white w-[15px]" />
          </IconButton>
          <span className="ml-10 text-lg">{brother.phone}</span>
        </ListItem>
        <ListItem className="active:bg-gray-100 hover:bg-gray-100">
          <IconButton
            className="bg-blue-600 rounded-full max-w-[30px] max-h-[30px] cursor-default"
            variant="contained"
            aria-label="CoPresent"
          >
            <CoPresent className="text-white w-[15px]" />
          </IconButton>
          <span className="ml-10 text-lg">{brother.cong}</span>
        </ListItem>
      </List>
      <Divider className="my-2" />
      <DialogTitle>班表</DialogTitle>
      <List>
        {shiftList.length === 0 && (
          <ListItem>
            <ListItemText primary="目前沒有委派" />
          </ListItem>
        )}
        {shiftList}
      </List>
    </InfoPanel>
  );
}

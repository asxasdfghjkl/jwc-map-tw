import { InfoPanel } from '@/components/InfoPanel';
import { useData } from '@/contexts/DataContext';
import { updateUrl } from '@/utils/Url';
import { useQueryParam } from '@/utils/useQueryParam';
import { LABELS } from '@/VALUES';
import { Phone } from '@mui/icons-material';
import {
  Button,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React from 'react';

export function BrotherInfoDialog({}) {
  const { b } = useQueryParam();
  const { brothers, shifts, spots } = useData();

  const brother = React.useMemo(() => {
    if (!b) return null;
    if (brothers.length === 0) return null;

    return brothers.find((bro) => bro.name === b);
  }, [b, brothers]);

  const shiftList = React.useMemo(() => {
    if (!brother) return [];
    const results = [];
    const assignedShifts = shifts
      .filter((s) => s.am === brother.name || s.pm === brother.name)
      .sort((a, b) => a.date - b.date);

    for (let shift of assignedShifts) {
      ['am', 'pm'].forEach((time) => {
        if (shift[time] === brother.name) {
          const spot = spots.find((s) => s.id === shift.spot);

          results.push({
            date: LABELS[shift.date],
            time: LABELS[time],
            spotId: shift.spot,
            spotName: spot?.name ?? '(此地點不存在，請與監督聯絡)',
          });
        }
      });
    }

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
  }, [shifts, brother, spots]);

  if (!b) return null;

  return (
    <InfoPanel
      open
      onClose={() => updateUrl({ b: null })}
      mobileSummary={b}
      key={b}
    >
      <DialogTitle>
        {!!brother?.phone && (
          <Button
            variant="contained"
            href={'tel:' + brother.phone}
            startIcon={<Phone />}
          >
            {brother.phone}
          </Button>
        )}
      </DialogTitle>
      {!brother && (
        <DialogContentText>沒有弟兄的資料，請與聯絡監督聯絡</DialogContentText>
      )}

      <List>
        <ListSubheader>班表</ListSubheader>
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

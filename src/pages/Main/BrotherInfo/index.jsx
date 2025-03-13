import { useData } from '@/contexts/DataContext';
import { updateUrl } from '@/utils/Url';
import { useQueryParam } from '@/utils/useQueryParam';
import { Phone } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React from 'react';

const DATE_LABEL = {
  5: '7/4(五)',
  6: '7/5(六)',
  7: '7/6(日)',
  am: '上午 8:00 ~ 12:45',
  pm: '下午 12:45 ~ 會後30分鐘',
};

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
            date: DATE_LABEL[shift.date],
            time: DATE_LABEL[time],
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

  return (
    <Dialog
      open={b}
      onClose={() => updateUrl({ b: null })}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{b}</DialogTitle>
      <DialogContent>
        {!brother && (
          <DialogContentText>
            沒有弟兄的資料，請與聯絡監督聯絡
          </DialogContentText>
        )}
        {!!brother?.phone && (
          <a href={'tel:' + brother.phone}>
            <Phone /> {brother.phone}
          </a>
        )}
        <List>
          <ListSubheader className="px-0">班表</ListSubheader>
          {shiftList.length === 0 && (
            <ListItem>
              <ListItemText primary="目前沒有委派" />
            </ListItem>
          )}
          {shiftList}
        </List>
      </DialogContent>
    </Dialog>
  );
}

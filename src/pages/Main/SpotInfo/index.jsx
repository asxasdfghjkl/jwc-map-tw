import { TabView } from '@/components/TabView';
import { useData } from '@/contexts/DataContext';
import { updateUrl } from '@/utils/Url';
import { useQueryParam } from '@/utils/useQueryParam';
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

export default function SpotInfoDialog() {
  const { shifts, spots } = useData();
  const { s } = useQueryParam();

  const spot = React.useMemo(() => {
    if (!s) return null;

    return spots.find((sp) => sp.id === s);
  }, [s, spots]);

  const spotShifts = React.useMemo(() => {
    if (!spot) return [];

    return [5, 6, 7].map((day) => {
      return shifts.find(
        (shift) => shift.date == day && shift.spot === spot.id
      );
    });
  }, [shifts, spot]);

  if (!spot) return null;

  return (
    <Dialog
      open
      onClose={() => {
        updateUrl({ s: null }, true);
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        {spot.id} {spot.name}
      </DialogTitle>
      <TabView
        headerElevation={0}
        tabs={[
          {
            name: 'instruction',
            label: '指引',
            render: (
              <DialogContentText className="whitespace-pre-line">
                {spot.description || '目前暫無指引，請與監督聯絡'}
              </DialogContentText>
            ),
          },
          {
            name: 'shifts',
            label: '班表',
            render: (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th"></TableCell>
                    <TableCell component="th">上午 7:30 ~ 12:45</TableCell>
                    <TableCell component="th">下午12:45 ~ 會後30分鐘</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">7/4(五)</TableCell>
                    <ShiftCell name={spotShifts[0]?.am} />
                    <ShiftCell name={spotShifts[0]?.pm} />
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">7/5(六)</TableCell>
                    <ShiftCell name={spotShifts[1]?.am} />
                    <ShiftCell name={spotShifts[1]?.pm} />
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">7/6(日)</TableCell>
                    <ShiftCell name={spotShifts[2]?.am} />
                    <ShiftCell name={spotShifts[2]?.pm} />
                  </TableRow>
                </TableBody>
              </Table>
            ),
          },
        ]}
      />
    </Dialog>
  );
}

function ShiftCell({ name }) {
  const { getPhone } = useData();
  return (
    <TableCell>
      {name}
      <br />
      <a href={`tel:${getPhone(name)}`}>{getPhone(name)}</a>
    </TableCell>
  );
}

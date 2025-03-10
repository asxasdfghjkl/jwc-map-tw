import { TabView } from '@/components/TabView';
import { useData } from '@/contexts/DataContext';
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

/**
 *
 * @param {{info :import('@/contexts/DataContext').SpotData , onClose: () => void}} props
 * @returns {import('react').JSX}
 */
export default function SpotInfoDialog({ info, onClose }) {
  const { shifts } = useData();

  const spotShifts = React.useMemo(() => {
    return [5, 6, 7].map((day) => {
      return shifts.find((s) => s.date == day && s.spot === info.id);
    });
  }, [shifts, info.id]);

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {info.id} {info.name}
      </DialogTitle>
      <TabView
        headerElevation={0}
        tabs={[
          {
            name: 'instruction',
            label: '指引',
            render: (
              <DialogContentText className="whitespace-pre-line">
                {info.description}
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

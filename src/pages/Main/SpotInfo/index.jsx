import { InfoPanel } from '@/components/InfoPanel';
import { TabView } from '@/components/TabView';
import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { updateUrl } from '@/utils/Url';
import { useQueryParam } from '@/utils/useQueryParam';
import { LABELS } from '@/VALUES';
import {
  DialogContentText,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

export default function SpotInfoDialog() {
  const { shifts, spots, times } = useData();
  const { s } = useQueryParam();
  const { isMobile } = useDisplayMode();
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

  if (isMobile) {
    return (
      <InfoPanel
        open={spot}
        t0
        onClose={() => {
          updateUrl({ s: null }, true);
        }}
        desktopHeader={spot.name}
        mobileSummary={spot.id + ' ' + spot.name}
      >
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
                      <TableCell component="th">
                        {times[spot.time].am}
                      </TableCell>
                      <TableCell component="th">
                        {times[spot.time].pm}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">{LABELS[5]}</TableCell>
                      <ShiftCell name={spotShifts[0]?.am} />
                      <ShiftCell name={spotShifts[0]?.pm} />
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">{LABELS[6]}</TableCell>
                      <ShiftCell name={spotShifts[1]?.am} />
                      <ShiftCell name={spotShifts[1]?.pm} />
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">{LABELS[7]}</TableCell>
                      <ShiftCell name={spotShifts[2]?.am} />
                      <ShiftCell name={spotShifts[2]?.pm} />
                    </TableRow>
                  </TableBody>
                </Table>
              ),
            },
          ]}
        />
      </InfoPanel>
    );
  }
  return (
    <InfoPanel
      open={spot}
      t0
      onClose={() => {
        updateUrl({ s: null }, true);
      }}
      desktopHeader={spot.name}
      mobileSummary={spot.id + ' ' + spot.name}
      key={spot.id}
    >
      <Divider className="my-2" />
      <div className="pb-4">
        <DialogTitle>指引</DialogTitle>
        <DialogContentText className="whitespace-pre-line px-6 text-gray-800 text-lg">
          {spot.description || '目前暫無指引，請與監督聯絡'}
        </DialogContentText>
      </div>
      <Divider className="my-2" />
      <div>
        <DialogTitle className="pb-0">班表</DialogTitle>
        <Table className="w-[calc(100%-2rem)] ml-4 text-center">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: '50px' }}
                className="px-0 py-4 align-top"
                component="th"
              ></TableCell>
              <TableCell
                component="th"
                className="px-4 pb-2 text-base align-top"
              >
                {LABELS.am}
              </TableCell>
              <TableCell
                component="th"
                className="px-4 pb-2 text-base align-top"
              >
                {LABELS.pm}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{ width: '50px' }}
                className="px-0 py-4 align-top"
                component="th"
              >
                {LABELS[5]}
              </TableCell>
              <ShiftCell name={spotShifts[0]?.am} />
              <ShiftCell className="p-2" name={spotShifts[0]?.pm} />
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ width: '50px' }}
                className="px-0 py-4 align-top"
                component="th"
              >
                {LABELS[6]}
              </TableCell>
              <ShiftCell name={spotShifts[1]?.am} />
              <ShiftCell name={spotShifts[1]?.pm} />
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ width: '50px' }}
                className="px-0 py-4 align-top"
                component="th"
              >
                {LABELS[7]}
              </TableCell>
              <ShiftCell name={spotShifts[2]?.am} />
              <ShiftCell name={spotShifts[2]?.pm} />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </InfoPanel>
  );
}

function ShiftCell({ name }) {
  const { getPhone } = useData();
  return (
    <TableCell className="px-4 py-2 align-top">
      <p className="text-xl">{name}</p>
      <a className="text-base" href={`tel:${getPhone(name)}`}>
        {getPhone(name)}
      </a>
    </TableCell>
  );
}

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
  const { spots, times, getPhone } = useData();
  const { s } = useQueryParam();
  const { isMobile } = useDisplayMode();
  const spot = React.useMemo(() => {
    if (!s) return null;

    return spots.find((sp) => sp.id === s);
  }, [s, spots]);

  if (!spot) return null;

  if (isMobile) {
    return (
      <InfoPanel
        open={spot}
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
                <>
                  <DialogContentText className="whitespace-pre-line text-lg">
                    組長: {spot.overseer}
                    <br />
                    <a
                      className="text-base"
                      href={`tel:${getPhone(spot.overseer)}`}
                    >
                      {getPhone(spot.overseer)}
                    </a>
                  </DialogContentText>
                  <hr className="mb-3" />
                  <DialogContentText className="whitespace-pre-line">
                    {spot.description || '目前暫無指引，請與監督聯絡'}
                  </DialogContentText>
                </>
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
                      <ShiftCell name={spot.am5} />
                      <ShiftCell name={spot.pm5} />
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">{LABELS[6]}</TableCell>
                      <ShiftCell name={spot.am6} />
                      <ShiftCell name={spot.pm6} />
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">{LABELS[7]}</TableCell>
                      <ShiftCell name={spot.am7} />
                      <ShiftCell name={spot.pm7} />
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
      onClose={() => {
        updateUrl({ s: null }, true);
      }}
      desktopHeader={spot.name}
      mobileSummary={spot.id + ' ' + spot.name}
      key={spot.id}
    >
      <Divider className="my-2" />
      <div className="pb-4">
        <DialogTitle>組長</DialogTitle>
        <DialogContentText className="whitespace-pre-line px-6 text-gray-800 text-lg">
          {spot.overseer}
          <br />
          <a className="text-base" href={`tel:${getPhone(spot.overseer)}`}>
            {getPhone(spot.overseer)}
          </a>
        </DialogContentText>
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
                {times[spot.time].am}
              </TableCell>
              <TableCell
                component="th"
                className="px-4 pb-2 text-base align-top"
              >
                {times[spot.time].pm}
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
              <ShiftCell name={spot.am5} />
              <ShiftCell name={spot.pm5} />
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ width: '50px' }}
                className="px-0 py-4 align-top"
                component="th"
              >
                {LABELS[6]}
              </TableCell>
              <ShiftCell name={spot.am6} />
              <ShiftCell name={spot.pm6} />
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ width: '50px' }}
                className="px-0 py-4 align-top"
                component="th"
              >
                {LABELS[7]}
              </TableCell>
              <ShiftCell name={spot.am7} />
              <ShiftCell name={spot.pm7} />
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

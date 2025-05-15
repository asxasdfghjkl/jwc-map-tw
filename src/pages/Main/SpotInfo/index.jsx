import { InfoPanel } from '@/components/InfoPanel';
import { TabView } from '@/components/TabView';
import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import SpotInstruction from '@/pages/Main/SpotInfo/SpotInstruction';
import SupporterSpot from '@/pages/Main/SpotInfo/SupporterSpot';
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
  Typography,
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

  if (spot.type === 'supporters') return <SupporterSpot spot={spot} />;

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
      {isMobile ? (
        <TabView
          headerElevation={0}
          tabs={[
            {
              name: 'instruction',
              label: '指引',
              render: <SpotInstruction spot={spot} />,
            },
            {
              name: 'shifts',
              label: '班表',
              render: <ShiftTable spot={spot} />,
            },
          ]}
        />
      ) : (
        <>
          <Divider className="my-2" />
          <SpotInstruction spot={spot} />
          <Divider className="my-2" />
          <Typography variant="h6" className="mt-3">
            班表
          </Typography>
          <div className="-mx-3 -mt-3">
            <ShiftTable spot={spot} />
          </div>
        </>
      )}
    </InfoPanel>
  );
}

function ShiftTable({ spot }) {
  const { times } = useData();
  return (
    <Table className="text-center">
      <TableHead>
        <TableRow>
          <TableCell
            className="px-0 py-4 align-top w-[50px]"
            component="th"
          ></TableCell>
          <TableCell
            component="th"
            className="px-4 pb-2 align-top whitespace-pre-wrap w-[150px]"
          >
            {times[spot.time].am?.replace(/~\s+/g, '~\n')}
          </TableCell>
          <TableCell
            component="th"
            className="px-4 pb-2 align-top whitespace-pre-wrap w-[150px]"
          >
            {times[spot.time].pm?.replace(/~\s+/g, '~\n')}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[5, 6, 7].map((day) => (
          <TableRow key={day}>
            <TableCell className="px-0 py-4 align-top" component="th">
              {LABELS[day]}
            </TableCell>
            <ShiftCell brother={spot[`am${day}`]} />
            <ShiftCell brother={spot[`pm${day}`]} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ShiftCell({ brother }) {
  const { getPhone } = useData();

  const [serial, name] = brother.split('-');
  const phone = getPhone(brother);
  return (
    <TableCell className="px-2 py-2 align-top">
      <p className="text-xl">
        <small>{serial}-</small>
        {name}
      </p>
      <a className="text-base" href={`tel:${phone}`}>
        {phone}
      </a>
    </TableCell>
  );
}

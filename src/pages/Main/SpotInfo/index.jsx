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
          <ShiftTable spot={spot} />
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
            sx={{ width: '50px' }}
            className="px-0 py-4 align-top"
            component="th"
          ></TableCell>
          <TableCell
            component="th"
            className="px-4 pb-2 whitespace-pre-wrap align-top"
          >
            {times[spot.time].am}
          </TableCell>
          <TableCell component="th" className="px-4 pb-2  align-top">
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

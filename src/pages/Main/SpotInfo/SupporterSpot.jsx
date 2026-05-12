import { InfoPanel } from '@/components/InfoPanel';
import { TabView } from '@/components/TabView';
import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import SpotInstruction from '@/pages/Main/SpotInfo/SpotInstruction';
import { updateUrl } from '@/utils/Url';
import { LABELS } from '@/VALUES';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

export default function SupporterSpot({ spot }) {
  const { times, getPhone, supporters } = useData();
  const { isMobile } = useDisplayMode();

  return (
    <InfoPanel
      open={spot}
      onClose={() => {
        updateUrl({ s: null }, true);
      }}
      desktopHeader={spot.name}
      mobileSummary={spot.id + ' ' + spot.name}
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
              render: <ShiftInfo />,
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
          <ShiftInfo />
        </>
      )}
    </InfoPanel>
  );
}

function ShiftInfo() {
  const { supporters, getPhone } = useData();
  const [session, setSession] = React.useState(() => {
    const today = new Date();
    if (today.getFullYear() === 2026) {
      if (today.getMonth() + 1 === 7) {
        if (today.getDate() >= 3 && today.getDate() <= 5) {
          const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
          const time = today.getHours() < 12 ? 'Am' : 'Pm';
          const prop = `${day[today.getDay()]}${time}`;
          if (supporters[prop]) {
            return prop;
          }
        }
      }
    }
    return 'friAm';
  });
  return (
    <div className="mt-2">
      <Select
        label="時段"
        fullWidth
        value={session}
        onChange={(evt) => setSession(evt.target.value)}
      >
        <MenuItem value="friAm">7/3 (五) 上午</MenuItem>
        <MenuItem value="friPm">7/3 (五) 下午</MenuItem>
        <MenuItem value="satAm">7/4 (六) 上午</MenuItem>
        <MenuItem value="satPm">7/4 (六) 下午</MenuItem>
        <MenuItem value="sunAm">7/5 (日) 上午</MenuItem>
        <MenuItem value="sunPm">7/5 (日) 下午</MenuItem>
      </Select>
      <List>
        {supporters[session].map((name) => (
          <ListItem key={name}>
            <ListItemText
              primary={name}
              secondary={<a href={`tel:${getPhone(name)}`}>{getPhone(name)}</a>}
            />
          </ListItem>
        ))}
      </List>
    </div>
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

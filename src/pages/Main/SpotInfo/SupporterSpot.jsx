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
    if (today.getFullYear() === 2025) {
      if (today.getMonth() + 1 === 7) {
        if (today.getDate() >= 4 && today.getDate() <= 6) {
          const time = today.getHours() < 12 ? 'am' : 'pm';
          const prop = `${time}${today.getDate() + 1}`;
          if (supporters[prop]) {
            return prop;
          }
        }
      }
    }
    return 'am5';
  });
  return (
    <div className="mt-2">
      <Select
        label="時段"
        fullWidth
        value={session}
        onChange={(evt) => setSession(evt.target.value)}
      >
        <MenuItem value="am5">7/4 (五) 上午</MenuItem>
        <MenuItem value="pm5">7/4 (五) 下午</MenuItem>
        <MenuItem value="am6">7/5 (六) 上午</MenuItem>
        <MenuItem value="pm6">7/5 (六) 下午</MenuItem>
        <MenuItem value="am7">7/6 (日) 上午</MenuItem>
        <MenuItem value="pm7">7/6 (日) 下午</MenuItem>
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

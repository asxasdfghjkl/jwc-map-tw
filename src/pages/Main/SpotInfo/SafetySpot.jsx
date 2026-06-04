import { InfoPanel } from '@/components/InfoPanel';
import { TabView } from '@/components/TabView';
import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import SpotInstruction from '@/pages/Main/SpotInfo/SpotInstruction';
import { updateUrl } from '@/utils/Url';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TableCell,
  Typography,
} from '@mui/material';
import React from 'react';

export default function SafetySpot({ spot }) {
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
  const { safety } = useData();

  return (
    <div className="mt-2">
      <List>
        {safety.map(({ name, phone }) => (
          <ListItem key={name}>
            <ListItemText
              primary={name}
              secondary={phone && <a href={`tel:${phone}`}>{phone}</a>}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

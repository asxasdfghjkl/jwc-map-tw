import { AppBar, Paper, Tab, Tabs } from '@mui/material';
import React from 'react';

export function TabView({ tabs }) {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0].name);
  const [inited] = React.useState({ [tabs[0].name]: true });

  return (
    <Paper className="flex flex-col" elevation={3}>
      <AppBar position="static" color="inherit">
        <Tabs
          variant="fullWidth"
          value={selectedTab}
          onChange={(evt, tab) => {
            inited[tab] = true;
            setSelectedTab(tab);
          }}
        >
          {tabs.map((t) => (
            <Tab key={t.name} label={t.label} value={t.name} />
          ))}
        </Tabs>
      </AppBar>
      <div className="mt-3 p-3">
        {tabs.map((t) => (
          <div
            key={t.name}
            className={selectedTab === t.name ? 'block' : 'hidden'}
          >
            {!!inited[t.name] && t.render}
          </div>
        ))}
      </div>
    </Paper>
  );
}

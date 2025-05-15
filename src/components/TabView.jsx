import { AppBar, Paper, Tab, Tabs } from '@mui/material';
import React from 'react';

/** @typedef {object} TabConfig
 *  @property {string} name
 *  @property {string} label
 *  @property {React.ReactNode} render
 */

/**
 *
 * @param {{tabs: TabConfig[], headerElevation: number}} props
 * @returns
 */
export function TabView({ tabs, headerElevation = 3 }) {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0].name);
  const [inited] = React.useState({ [tabs[0].name]: true });

  return (
    <Paper className="flex flex-col shadow-none">
      <AppBar position="static" color="inherit" elevation={headerElevation}>
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
      <div>
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

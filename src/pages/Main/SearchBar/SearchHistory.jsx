import { getSearchHistory, removeSearchHistory } from '@/helpers/SearchHistory';
import { DeleteOutline, History as HistoryIcon } from '@mui/icons-material';
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React from 'react';

export function SearchHistory({ onHistoryClick }) {
  const history = getSearchHistory();

  const [, refresh] = React.useState();
  return (
    <>
      <ListSubheader className="h-6 text-xs">近期搜尋</ListSubheader>
      {history.length === 0 && (
        <ListItem>
          <ListItemText primary="沒有搜尋紀錄" />
        </ListItem>
      )}
      {history.map((h) => (
        <ListItemButton key={h} data-item={h} onClick={onHistoryClick}>
          <ListItemAvatar>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
          </ListItemAvatar>
          <ListItemText primary={h} />
          <IconButton
            onClick={(evt) => {
              evt.stopPropagation();
              removeSearchHistory(h);
              refresh(new Date());
            }}
          >
            <DeleteOutline />
          </IconButton>
        </ListItemButton>
      ))}
    </>
  );
}

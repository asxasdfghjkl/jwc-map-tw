import { History as HistoryIcon } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export function SearchHistory({ onSelectHistory }) {
  const history = JSON.parse(localStorage.history ?? '[]');
  if (!Array.isArray(history)) {
    localStorage.history = '[]';
    history = [];
  }

  const onItemClick = (evt) => onSelectHistory(evt.currentTarget.dataset.item);

  return (
    <>
      <ListSubheader>近期搜尋</ListSubheader>
      {history.map((h) => (
        <ListItemButton key={h} data-item={h} onClick={onItemClick}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary={h} />
        </ListItemButton>
      ))}
    </>
  );
}

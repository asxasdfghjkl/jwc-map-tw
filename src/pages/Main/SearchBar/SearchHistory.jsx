import { useData } from '@/contexts/DataContext';
import { addSearchHistory, getSearchHistory } from '@/helpers/SearchHistory';
import { updateUrl } from '@/utils/Url';
import { History as HistoryIcon } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export function SearchHistory({ onHistoryClick }) {
  const history = getSearchHistory();

  return (
    <>
      <ListSubheader>近期搜尋</ListSubheader>
      {history.map((h) => (
        <ListItemButton key={h} data-item={h} onClick={onHistoryClick}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary={h} />
        </ListItemButton>
      ))}
    </>
  );
}

import { addSearchHistory, getSearchHistory } from '@/helpers/SearchHistory';
import { updateUrl } from '@/utils/Url';
import { History as HistoryIcon } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export function SearchHistory({}) {
  const history = getSearchHistory();

  const onItemClick = (evt) => {
    const { item: text } = evt.currentTarget.dataset;
    addSearchHistory(text);
    updateUrl({ f: text });
  };

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

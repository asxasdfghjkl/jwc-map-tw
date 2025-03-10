import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Person, PinDrop } from '@mui/icons-material';

export function SearchResultItem({ label, type, value, onClick }) {
  return (
    <ListItemButton data-item={value} data-type={type} onClick={onClick}>
      <ListItemIcon>
        {type === 'brother' ? <Person /> : <PinDrop />}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

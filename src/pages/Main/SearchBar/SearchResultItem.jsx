import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PinDropIcon from '@mui/icons-material/PinDrop';

export function SearchResultItem({ label, type, value, onClick }) {
  return (
    <ListItemButton data-item={value} data-type={type} onClick={onClick}>
      <ListItemIcon>
        {type === 'brother' ? <PersonIcon /> : <PinDropIcon />}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

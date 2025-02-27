import { useData } from '@/contexts/DataContext';
import {
  Autocomplete,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  TextField,
} from '@mui/material';
import React from 'react';

export default function BrotherFilter() {
  const { brothers, shifts } = useData();
  const [selectedBrother, setSelectedBrother] = React.useState(null);

  const filteredShifts = React.useMemo(() => {
    if (!selectedBrother) return [];
    return shifts.filter(
      (s) => s.am === selectedBrother.name || s.pm === selectedBrother.name
    );
  }, [selectedBrother, shifts]);

  return (
    <div>
      <Autocomplete
        options={brothers}
        getOptionKey={(item) => item.name}
        getOptionLabel={(item) => item.name}
        value={selectedBrother}
        onChange={(evt, value) => setSelectedBrother(value)}
        renderInput={(props) => <TextField {...props} label="姓名" />}
      />
      {selectedBrother && (
        <List>
          <ListSubheader className="p-0">服務時段：</ListSubheader>
          {filteredShifts.length === 0 && <ListItem>無服務時段</ListItem>}
          {filteredShifts.map((shift) => (
            <ListItemButton
              key={shift.date + shift.spot}
              onClick={() => (window.location.hash = shift.spot)}
            >
              <ListItemText
                primary={`${shift.date} ${getSectionLabel(
                  shift,
                  selectedBrother.name
                )}`}
                secondary={shift.spot}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
}

function getSectionLabel(shift, brotherName) {
  if (shift.am === brotherName) {
    if (shift.pm === shift.am) return '全天';
    return '上午';
  }
  return '下午';
}

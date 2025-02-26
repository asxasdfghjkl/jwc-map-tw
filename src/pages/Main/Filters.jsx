import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useData } from '../../contexts/DataContext';

export default function Filters({ onSelectSpot }) {
  const { maps, spots } = useData();

  const [assignee, setAssignee] = React.useState('');
  const [map, setMap] = React.useState('*');
  const [location, setLocation] = React.useState('');

  const spotOptions = React.useMemo(() => {
    if (map === '*') return spots;
    return spots.filter((loc) => loc.map === map);
  }, [map, spots]);

  React.useEffect(() => {
    onSelectSpot?.(location);
  }, [location, onSelectSpot]);

  return (
    <form className="gap-4 flex">
      <TextField
        select
        fullWidth
        label="區域"
        value={map}
        onChange={(evt) => setMap(evt.target.value)}
      >
        <MenuItem value="*">全部</MenuItem>
        {maps.map((map) => (
          <MenuItem key={map.name} value={map.name}>
            {map.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        fullWidth
        label="位置"
        value={location}
        onChange={(evt) => setLocation(evt.target.value)}
      >
        {spotOptions.map((loc) => (
          <MenuItem key={loc.name} value={loc.id}>
            {loc.name}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
}

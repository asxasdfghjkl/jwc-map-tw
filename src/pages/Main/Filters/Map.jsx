import { useData } from '@/contexts/DataContext';
import { MenuItem, TextField } from '@mui/material';
import React from 'react';

export default function MapFilter() {
  const { maps } = useData();

  const [selectedMap, setSelectedMap] = React.useState();

  return (
    <div>
      <TextField
        fullWidth
        label="會場"
        select
        value={selectedMap}
        onChange={(evt) => setSelectedMap(evt.target.value)}
      >
        {maps.map((m) => (
          <MenuItem key={m.name} value={m.name}>
            {m.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

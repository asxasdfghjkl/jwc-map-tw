import { useData } from '@/contexts/DataContext';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export default function MapFilter() {
  const { maps, spots, shifts } = useData();

  const [selectedMapName, setSelectedMapName] = React.useState('');

  const spotsInSelectedMap = React.useMemo(() => {
    if (!selectedMapName) return spots;
    return spots.filter((s) => s.map === selectedMapName);
  }, [selectedMapName, spots]);

  const [spotFilter, setSpotFilter] = React.useState('');
  const spotFilterFunc = React.useMemo(() => {
    if (!spotFilter) return (arr) => arr;
    try {
      const reg = new RegExp(spotFilter, 'i');
      return (arr) =>
        arr.filter((item) => reg.test(item.id) || reg.test(item.name));
    } catch (ex) {
      return (arr) =>
        arr.filter(
          (item) =>
            item.id.includes(spotFilter) || item.name.includes(spotFilter)
        );
    }
  }, [spotFilter]);

  const filteredSpots = React.useMemo(
    () => spotFilterFunc(spotsInSelectedMap),
    [spotFilterFunc, spotsInSelectedMap]
  );

  const [selectedSpot, setSelectedSpot] = React.useState('');
  const shiftsOfSelectedSpot = React.useMemo(() => {
    if (!selectedSpot) return null;
    return shifts.filter((s) => s.spot === selectedSpot.id);
  }, [selectedSpot, shifts]);

  return (
    <div>
      <TextField
        fullWidth
        label="會場"
        select
        value={selectedMapName}
        onChange={(evt) => setSelectedMapName(evt.target.value)}
      >
        <MenuItem value="">全部</MenuItem>
        {maps.map((m) => (
          <MenuItem key={m.name} value={m.name}>
            {m.name}
          </MenuItem>
        ))}
      </TextField>

      <List className="h-[300px] overflow-auto">
        <ListItem className="px-0">
          <TextField
            fullWidth
            variant="standard"
            value={spotFilter}
            onChange={(evt) => setSpotFilter(evt.target.value)}
            placeholder="搜尋"
          />
        </ListItem>
        {filteredSpots.length === 0 && <ListItem>沒有符合條件的地點</ListItem>}
        {filteredSpots.map((s) => (
          <ListItemButton
            key={s.id}
            selected={s === selectedSpot}
            onClick={() => {
              window.location.hash = s.id;
              setSelectedSpot(s);
            }}
          >
            <ListItemText primary={s.id + ' ' + s.name} />
          </ListItemButton>
        ))}
      </List>

      {selectedSpot && (
        <>
          <Divider />
          <Typography>
            {selectedSpot.id} {selectedSpot.name} 班表：
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>日期</TableCell>
                  <TableCell>上午</TableCell>
                  <TableCell>下午</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shiftsOfSelectedSpot.map((shift) => (
                  <TableRow key={shift.date + shift.spot}>
                    <TableCell>{shift.date}</TableCell>
                    <TableCell>{shift.am}</TableCell>
                    <TableCell>{shift.pm}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

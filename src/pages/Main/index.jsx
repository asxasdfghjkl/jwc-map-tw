import { LoadingView } from '@/components/LoadingView';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { useHash } from '@/utils/useHash';
import {
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  TextField,
} from '@mui/material';
import React from 'react';
import { useData } from './../../contexts/DataContext';
import { Map } from './Map';
import { NavigateBefore, Person, PinDrop, Search } from '@mui/icons-material';
import { BottomSheet } from '@/components/BottomSheet';

export default function Main() {
  const { loading, brothers, spots } = useData();
  const { isMobile } = useDisplayMode();
  const hash = useHash();

  const [filterInput, setFilterInput] = React.useState('');
  const [showFilter, setShowFilter] = React.useState(false);

  const filterFn = React.useMemo(() => {
    if (!filterInput) return null;
    try {
      const reg = new RegExp(filterInput, 'i');
      return (item) => reg.test(item.name);
    } catch (ex) {
      return (item) => item.name.includes(filterInput);
    }
  }, [filterInput]);

  const items = React.useMemo(() => {
    return [
      ...brothers.map((b) => ({
        name: b.name,
        type: 'brother',
      })),
      ...spots.map((s) => ({
        name: s.id + ' ' + s.name,
        type: 'spot',
      })),
    ];
  }, [brothers, spots]);

  const filteredItems = React.useMemo(() => {
    if (!filterFn) return [];
    return items.filter(filterFn);
  }, [filterFn, items]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <LoadingView />
      </div>
    );
  }

  return (
    <main className="flex flex-row h-full w-full">
      <Paper
        className="fixed top-4 w-[300px] left-[50%] -ml-[150px] z-[1000]"
        elevation={3}
      >
        <TextField
          fullWidth
          placeholder="請輸入姓名或是位置編號"
          value={filterInput}
          onFocus={(evt) => {
            evt.target.blur();
            setShowFilter(true);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton disabled>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      {showFilter && (
        <Dialog open fullScreen={isMobile}>
          <DialogContent className="flex justify-center p-3 h-full">
            <div className="flex flex-col w-[300px]">
              <TextField
                fullWidth
                placeholder="請輸入姓名或是位置編號"
                value={filterInput}
                onChange={(evt) => setFilterInput(evt.target.value)}
                onFocus={() => setShowFilter(true)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => {
                          setShowFilter(false);
                          window.document.body.focus();
                        }}
                      >
                        <NavigateBefore />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <List>
                {!filterInput && (
                  <>
                    <ListSubheader>近期搜尋</ListSubheader>
                    <ListItemButton onClick={() => setFilterInput('張朝銘')}>
                      張朝銘
                    </ListItemButton>
                  </>
                )}
                {!!filterInput && (
                  <>
                    {filteredItems.length === 0 && (
                      <ListItem>沒有符合條件的項目</ListItem>
                    )}
                    {filteredItems.map((item) => (
                      <ListItemButton key={item.name}>
                        <ListItemIcon>
                          {item.type === 'brother' ? <Person /> : <PinDrop />}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    ))}
                  </>
                )}
              </List>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Map />
      <BottomSheet summary={<h1>hello</h1>} />
    </main>
  );
}

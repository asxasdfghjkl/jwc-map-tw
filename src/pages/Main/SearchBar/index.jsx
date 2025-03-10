import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { SearchHistory } from '@/pages/Main/SearchBar/SearchHistory';
import { SearchResultItem } from '@/pages/Main/SearchBar/SearchResultItem';
import { updateQuery } from '@/utils/Query';
import { NavigateBefore, Search } from '@mui/icons-material';
import {
  ClickAwayListener,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Portal,
  TextField,
} from '@mui/material';
import React from 'react';

/**
 *
 * @param {{}} props
 * @returns
 */
export function SearchBar() {
  const { isMobile } = useDisplayMode();
  const { brothers, spots } = useData();

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
        value: b.name,
        name: b.name,
        type: 'brother',
      })),
      ...spots.map((s) => ({
        value: s.id,
        name: s.id + ' ' + s.name,
        type: 'spot',
      })),
    ];
  }, [brothers, spots]);

  const filteredItems = React.useMemo(() => {
    if (!filterFn) return [];
    return items.filter(filterFn);
  }, [filterFn, items]);

  const onSearchResultItemClick = (evt) => {
    const { item, type } = evt.currentTarget.dataset;
    setFilterInput(item);
    if (type === 'spot') {
      window.location.hash = item;
      updateQuery('open', 'spot');
    }
    setShowFilter(false);
  };

  const renderedList = (
    <List>
      {!filterInput && <SearchHistory />}
      {!!filterInput && (
        <>
          {filteredItems.length === 0 && (
            <ListItem>沒有符合條件的項目</ListItem>
          )}
          {filteredItems.map((item) => (
            <SearchResultItem
              key={item.name}
              label={item.name}
              type={item.type}
              value={item.value}
              onClick={onSearchResultItemClick}
            />
          ))}
        </>
      )}
    </List>
  );

  return (
    <div className="absolute flex justify-center z-[1000] w-full left-0 top-4 desktop:justify-start desktop:pl-4">
      <ClickAwayListener
        onClickAway={() => {
          if (!isMobile) {
            setShowFilter(false);
          }
        }}
      >
        <Paper
          className="w-[300px]"
          elevation={3}
          tabIndex={0}
          onMouseDown={(evt) => {
            setShowFilter(true);
          }}
          // onBlur={() => setShowFilter(false)}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="請輸入姓名或是位置編號"
            value={filterInput}
            onChange={(evt) => setFilterInput(evt.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disabled>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {showFilter && renderedList}
        </Paper>
      </ClickAwayListener>
      <Dialog open={showFilter && isMobile} fullScreen keepMounted>
        <DialogContent className="flex justify-center p-4 h-full">
          <div className="flex flex-col w-[300px]">
            <TextField
              fullWidth
              size="small"
              placeholder="請輸入姓名或是位置編號"
              value={filterInput}
              onChange={(evt) => setFilterInput(evt.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => {
                          window.document.body.blur();
                          setShowFilter(false);
                        }}
                      >
                        <NavigateBefore />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {renderedList}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

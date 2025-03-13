import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { addSearchHistory } from '@/helpers/SearchHistory';
import { SearchHistory } from '@/pages/Main/SearchBar/SearchHistory';
import { SearchResultItem } from '@/pages/Main/SearchBar/SearchResultItem';
import { updateUrl } from '@/utils/Url';
import { useQueryParam } from '@/utils/useQueryParam';
import { Clear, NavigateBefore, Search } from '@mui/icons-material';
import {
  ClickAwayListener,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
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
  const { options } = useData();

  const { f: filterInput = '' } = useQueryParam();
  const [showFilter, setShowFilter] = React.useState(false);

  const filterFn = React.useMemo(() => {
    if (!filterInput) return null;
    try {
      const reg = new RegExp(filterInput, 'i');
      return (item) => reg.test(item.label);
    } catch (ex) {
      return (item) => item.label.includes(filterInput);
    }
  }, [filterInput]);

  const filteredItems = React.useMemo(() => {
    if (!filterFn) return [];
    return options.filter(filterFn);
  }, [filterFn, options]);

  const onSearchResultItemClick = (evt) => {
    const { item, type } = evt.currentTarget.dataset;
    addSearchHistory(item);
    setShowFilter(false);

    let itemType = type;
    if (!itemType) {
      const matched = options.filter((opt) => opt.value === item);
      if (matched.length === 1) {
        itemType = matched[0].type;
      }
    }

    if (itemType === 'spot') {
      updateUrl({ f: item, s: item, b: null, hash: item });
    } else if (itemType === 'brother') {
      updateUrl({ f: item, s: null, b: item });
    }
  };

  const inputRef = React.useRef();
  return (
    <div className="fixed flex justify-center z-[1000] w-full left-0 top-4 desktop:justify-start desktop:pl-4">
      <ClickAwayListener onClickAway={() => setShowFilter(false)}>
        <Paper
          className="w-[300px]"
          elevation={3}
          tabIndex={0}
          onMouseDown={() => {
            setShowFilter(true);
          }}
        >
          <form autoComplete="off">
            <TextField
              fullWidth
              size="small"
              placeholder="請輸入姓名或是位置編號"
              value={filterInput}
              autoComplete="off"
              inputRef={inputRef}
              onChange={(evt) => updateUrl({ f: evt.target.value }, true)}
              slotProps={{
                input: {
                  'aria-autocomplete': 'none',
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton disabled>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          updateUrl({ f: '' }, true);
                          inputRef.current?.focus();
                        }}
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </form>
          {showFilter && (
            <List className="max-h-[500px] overflow-auto">
              {!filterInput && (
                <SearchHistory onHistoryClick={onSearchResultItemClick} />
              )}
              {!!filterInput && (
                <>
                  {filteredItems.length === 0 && (
                    <ListItem>沒有符合條件的項目</ListItem>
                  )}
                  {filteredItems.map((item) => (
                    <SearchResultItem
                      key={item.label}
                      label={item.label}
                      type={item.type}
                      value={item.value}
                      onClick={onSearchResultItemClick}
                    />
                  ))}
                </>
              )}
            </List>
          )}
        </Paper>
      </ClickAwayListener>
    </div>
  );
}

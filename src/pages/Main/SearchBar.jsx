import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper, TextField } from '@mui/material';

/**
 *
 * @param {{value:string, onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>}} props
 * @returns
 */
export function SearchBar({ value, onFocus }) {
  return (
    <div className="absolute flex justify-center z-[1000] w-full left-0 top-4 desktop:justify-start desktop:pl-4">
      <Paper className="w-[300px]" elevation={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="請輸入姓名或是位置編號"
          value={value}
          onFocus={onFocus}
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
      </Paper>
    </div>
  );
}

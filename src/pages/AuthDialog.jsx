import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  DialogTitle,
} from '@mui/material';
import React from 'react';

export function AuthDialog({ onChange }) {
  const [text, setText] = React.useState('');
  return (
    <Dialog open maxWidth="xs" fullWidth>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          onChange?.(text);
          localStorage.password = text;
        }}
      >
        <DialogTitle>請驗證權限</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">確認</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

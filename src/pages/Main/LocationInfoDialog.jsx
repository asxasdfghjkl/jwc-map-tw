import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function LocationInfoDialog({ info, onClose }) {
  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{info.name}</DialogTitle>
      <DialogContent>
        <DialogContentText className="whitespace-pre-line">
          {info.description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function SpotInfoDialog({ info, onClose }) {
  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {info.id} {info.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="whitespace-pre-line">
          {info.description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

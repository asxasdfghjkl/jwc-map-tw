import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const Section = ({ header, children }) => (
  <div>
    <Typography variant="h5">{header}</Typography>
    <Typography>{children}</Typography>
  </div>
);

const Instruction = ({ children }) => {
  if (typeof children !== 'string') return children;
  if (children.startsWith('#')) {
    return (
      <Typography variant="h5" className="not-first:mt-8">
        {children.substring(1)}
      </Typography>
    );
  } else {
    return <Typography>{children}</Typography>;
  }
};

const InstructionDialog = ({ onClose, header, content, closeBtn = '關閉' }) => {
  return (
    <Dialog open fullWidth maxWidth="md">
      <DialogTitle>{header}</DialogTitle>
      <DialogContent className="flex flex-col whitespace-pre-wrap">
        {content.split('\n').map((line) => (
          <Instruction key={line}>{line}</Instruction>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          {closeBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionDialog;

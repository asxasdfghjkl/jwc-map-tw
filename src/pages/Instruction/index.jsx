import { useData } from '@/contexts/DataContext';
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

const InstructionDialog = ({ onClose }) => {
  const { config } = useData();
  const onConfirm = () => {
    localStorage.setItem('instruction', true);
    onClose();
  };
  return (
    <Dialog open fullWidth maxWidth="md">
      <DialogTitle>注意事項</DialogTitle>
      <DialogContent className="flex flex-col whitespace-pre-wrap">
        {config['指引'].split('\n').map((line) => (
          <Instruction key={line}>{line}</Instruction>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm}>
          我已經閱讀完上述指引，並且願意按照指引完成服務
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionDialog;

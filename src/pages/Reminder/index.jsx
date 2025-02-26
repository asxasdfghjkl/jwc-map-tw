import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Reminder from "../../components/Reminder";

const ReminderComponent = ({ attentions, onClose }) => {
  const onConfirm = () => {
    localStorage.setItem("reminder", false);
    onClose();
  };
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>注意事項</DialogTitle>
      <DialogContent className="flex flex-col gap-8">
        {attentions.map((a, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Reminder key={i} title={a.title}>
            {a.items.split("\n").map((item) => (
              <div key={item}>{item}</div>
            ))}
          </Reminder>
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

export default ReminderComponent;

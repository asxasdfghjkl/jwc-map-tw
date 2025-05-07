import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const header = 'h5';
const content = 'text';

const ReminderComponent = ({ onClose }) => {
  const onConfirm = () => {
    localStorage.setItem('instruction', true);
    onClose();
  };
  return (
    <Dialog open fullWidth maxWidth="md">
      <DialogTitle>注意事項</DialogTitle>
      <DialogContent className="flex gap-8 flex-col">
        <Typography variant={header}>閱讀指引</Typography>
        <Typography variant={content}>
          請仔細閱讀CO-23《分區大會和區域大會招待員指引》和本地工作指引
          熟悉緊急應變計畫與逃生路線
        </Typography>
        <Typography variant={header}>工作會議</Typography>
        <Typography variant={content}>
          所有招待員都需要參加星期五早上7：30的工作會議，地點在:
        </Typography>
        <Typography variant={header}>表現熱情</Typography>
        <Typography variant={content}>
          招待員要表現熱情歡迎所有與會者參與大會。要盡力表現「好客之道」
        </Typography>
        <Typography variant={header}>計算人數與樓層組長</Typography>
        <Typography variant={content}>
          座位區招待員：請所有後方招待員負責計算人數，並回報給組長
          公共區域招待員:請所有受指定的公共區域招待員，負責計算人數，並回報組長
          時間：上午11：00和下午2：00
        </Typography>
        <Typography variant={header}>中午用餐</Typography>
        <Typography variant={content}>
          座位區：請與同區塊的招待員協調，至少一位留在負責的座位區內
          非座位區：請在服務地點用餐，或等待換班 安全 請所有招待員備妥手電筒
          隨時保持警覺，留心任何造成危險的行為 手機保持開機
          未經批准請勿離開工作崗位，如需如廁請按照指引，告知周邊招待員或通知組長
        </Typography>
        <Typography variant={header}>緊急聯絡</Typography>
        <Typography variant={content}>
          李緒文 <a href="tel:0920-868-470">0920-868-470</a>（招待部監督）{' '}
          <br />
          沈謙挹 <a href="tel:0933-302-704">0933-302-704</a>（招待部助理監督）
          <br />
          李中復 <a href="tel:0928-343-457">
            0928-343-457
          </a>（招待部助理監督） <br />
          吳仁皓 <a href="tel:0926-547-189">0926-547-189</a>（急救部監督）
        </Typography>
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

import { CircularProgress, Typography } from '@mui/material';

export function LoadingView({ className }) {
  return (
    <div
      className={`h-full w-full flex justify-center items-center ${className}`}
    >
      <CircularProgress sx={{ color: "#7c86ff" }}/>
      <Typography variant="h4" className="pl-3">
        載入中
      </Typography>
    </div>
  );
}

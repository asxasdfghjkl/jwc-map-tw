import { CircularProgress, Typography } from '@mui/material';
import clsx from 'clsx';

export function LoadingView({ className, fullScreen }) {
  return (
    <div
      className={clsx(
        'flex justify-center items-center',
        className,
        fullScreen ? 'fixed inset-0' : 'h-full w-full'
      )}
    >
      <CircularProgress sx={{ color: '#7c86ff' }} />
      <Typography variant="h4" className="pl-3">
        載入中
      </Typography>
    </div>
  );
}

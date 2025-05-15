import { useData } from '@/contexts/DataContext';
import { Typography } from '@mui/material';
import clsx from 'clsx';

export default function SpotInstruction({ spot, className }) {
  const { getPhone } = useData();
  return (
    <div className={clsx(className)}>
      <Typography variant="h6" className="my-2">
        組長
      </Typography>
      <Typography className="whitespace-pre-line text-lg">
        {spot.overseer}
        <br />
        <a className="text-base" href={`tel:${getPhone(spot.overseer)}`}>
          {getPhone(spot.overseer)}
        </a>
      </Typography>
      <Typography variant="h6" className="my-3">
        指引
      </Typography>
      <Typography className="whitespace-pre-line text-lg">
        {spot.description || '目前暫無指引，請與監督聯絡'}
      </Typography>
    </div>
  );
}

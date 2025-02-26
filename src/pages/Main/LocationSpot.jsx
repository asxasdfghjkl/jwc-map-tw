import { Tooltip } from '@mui/material';

export default function LocationSpot({ info, onClick }) {
  return (
    <div
      className="absolute w-[20px] h-[20px] text-white bg-red-600 rounded-full flex justify-center items-center select-none cursor-pointer hover:bg-red-400 font-bold"
      style={{
        left: info.x + 'px',
        top: info.y + 'px',
      }}
      onClick={onClick}
    >
      {info.id}
    </div>
  );
}

export default function Spot({ info, onClick }) {
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

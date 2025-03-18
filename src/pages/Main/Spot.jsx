export default function Spot({ info, onClick, className = '' }) {
  return (
    <div
      className={`attendant-spot ${className}`}
      style={{
        left: info.x + 'px',
        top: (Number(info.y) -18) + 'px',
      }}
      onClick={onClick}
    >
      {info.id}
    </div>
  );
}

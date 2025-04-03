export default function Spot({ info, onClick, className = '' }) {
  return (
    <div
      className={`attendant-spot ${className}`}
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

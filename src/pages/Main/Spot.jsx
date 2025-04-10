export default function Spot({ info, scale, onClick, className = '' }) {
  return (
    <div
      className={`attendant-spot ${className}`}
      style={{
        left: info.x * scale + 'px',
        top: info.y * scale + 'px',
      }}
      onClick={onClick}
    >
      {info.id}
    </div>
  );
}

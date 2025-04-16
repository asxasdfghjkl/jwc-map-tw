export default function Spot({ info, scale, onClick, className = '' }) {
  return (
    <div
      className={`attendant-spot ${className}`}
      style={{
        left: info.x + 'px',
        top: info.y + 'px',
      }}
      onClick={onClick}
    >
      <span style={{ zoom: 'var(--z)' }}>{info.id}</span>
    </div>
  );
}

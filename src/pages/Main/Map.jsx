import { Button, IconButton } from '@mui/material';
import React from 'react';
import { useData } from '../../contexts/DataContext';

const ZOOM_STEP = 25;

export default function Map({ src, focusLocation }) {
  const [zoom, setZoom] = React.useState(100);
  const scale = zoom / 100;
  const { locations } = useData();
  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={() => setZoom((z) => z + ZOOM_STEP)}
        >
          +
        </Button>
        <Button
          variant="contained"
          onClick={() => setZoom((z) => z - ZOOM_STEP)}
        >
          -
        </Button>
      </div>
      <div className="w-full aspect-square max-w-[90dvh] overflow-auto">
        <div style={{ zoom: scale }} className="w-fit h-fit relative">
          <img
            alt="地圖"
            className="max-h-none max-w-none absolute left-0 right-0"
            src={src}
          />

          {locations.map((spot) => (
            <div
              key={spot.id}
              className="absolute w-[20px] h-[20px]"
              style={{
                left: spot.x + 'px',
                top: spot.y + 'px',
                borderRadius: 15,
                background: 'blue',
                color: 'white',
              }}
            >
              {spot.id}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useData } from '../../contexts/DataContext';
import LocationSpot from './LocationSpot';
import LocationInfoDialog from './LocationInfoDialog';

const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 400;

export default function Map({ src, focusLocation }) {
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = React.useRef();

  const [zoom, setZoom] = React.useState(100);
  const scale = zoom / 100;
  const { locations } = useData();

  const [selectedSpot, setSelectedSpot] = React.useState();

  React.useEffect(() => {
    if (focusLocation) {
      const spot = locations.find((loc) => loc.id === focusLocation);
      if (!spot) return;

      const container = containerRef.current;

      container.scrollTo(
        spot.x * scale - container.clientWidth / 2,
        spot.y * scale - container.clientHeight / 2
      );
    }
  }, [focusLocation]);
  return (
    <>
      {!!selectedSpot && (
        <LocationInfoDialog
          info={selectedSpot}
          onClose={() => setSelectedSpot()}
        />
      )}
      <ButtonGroup
        variant="contained"
        aria-label="Zoom control Buttons"
        className="m-3"
      >
        <Button
          disabled={zoom === ZOOM_MIN}
          onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
        >
          -
        </Button>
        <Button onClick={() => setZoom(100)}>{zoom}%</Button>
        <Button
          disabled={zoom === ZOOM_MAX}
          onClick={() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX))}
        >
          +
        </Button>
      </ButtonGroup>
      <div
        className="w-full aspect-square max-w-[90dvh] overflow-auto select-none"
        ref={containerRef}
      >
        <div style={{ zoom: scale }} className="w-fit h-fit relative">
          <img
            alt="地圖"
            className="max-h-none max-w-none absolute left-0 right-0"
            src={src}
          />

          {locations.map((spot) => (
            <LocationSpot
              key={spot.id}
              info={spot}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { getQueryParam } from '@/utils/Query';
import Spot from './Spot';
import SpotInfoDialog from './SpotInfoDialog';
import { usePersistFunction } from '@/utils/usePersistFunction';
import { useNativeEvent } from '@/utils/useNativeEvent';

const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 400;

export default function Map({ src, focusingSpot }) {
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = React.useRef();

  const [zoom, setZoom] = React.useState(100);
  const scale = zoom / 100;
  const { spots } = useData();

  const [selectedSpot, setSelectedSpot] = React.useState();

  const highlightedSpot = React.useMemo(
    () => spots.find((s) => s.id === focusingSpot),
    [focusingSpot, spots]
  );

  React.useEffect(() => {
    if (highlightedSpot) {
      const container = containerRef.current;
      container.scrollTo({
        left: highlightedSpot.x * scale - container.clientWidth / 2,
        top: highlightedSpot.y * scale - container.clientHeight / 2,
        behavior: 'auto',
      });
    }
  }, [highlightedSpot, scale]);

  const { xy } = getQueryParam();

  const onMapDoubleClick = usePersistFunction((evt) => {
    if (xy) {
      alert(
        `x: ${Math.floor(evt.offsetX / scale)}, y: ${Math.floor(
          evt.offsetY / scale
        )}`
      );
    }
  });
  useNativeEvent(containerRef.current, 'dblclick', onMapDoubleClick);

  return (
    <div className="w-full h-full flex flex-col border-black border-2 relative">
      {!!selectedSpot && (
        <SpotInfoDialog info={selectedSpot} onClose={() => setSelectedSpot()} />
      )}
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="Zoom control Buttons"
          className="absolute m-3 left-0 top-0 z-[100] opacity-80"
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
      </div>
      <div
        className="w-full h-full overflow-auto select-none"
        ref={containerRef}
      >
        <div style={{ zoom: scale }} className="w-fit h-fit relative">
          <img
            alt="地圖"
            className="max-h-none max-w-none absolute left-0 right-0"
            src={src}
          />

          {spots.map((spot) => (
            <Spot
              key={spot.id}
              info={spot}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}
          {!!highlightedSpot && (
            <Spot
              info={highlightedSpot}
              className="animate-ping z-0 pointer-events-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}

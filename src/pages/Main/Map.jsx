import { Button, ButtonGroup, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { getQueryParam } from '@/utils/Query';
import Spot from './Spot';
import SpotInfoDialog from './SpotInfoDialog';
import { useNativeEvent } from '@/utils/useNativeEvent';
import { useHash } from '@/utils/useHash';

const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 400;

export default function Map() {
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = React.useRef();

  const [zoom, setZoom] = React.useState(100);
  const scale = zoom / 100;

  const { spots, maps } = useData();
  const [selectedMapName, setSelectedMapName] = React.useState(maps[0].name);
  const selectedMap = React.useMemo(
    () => maps.find((m) => m.name === selectedMapName),
    [selectedMapName, maps]
  );
  const spotsInSelectedMap = React.useMemo(
    () => spots.filter((s) => s.map === selectedMapName),
    [spots, selectedMapName]
  );

  const highlightedSpotName = useHash();
  const highlightedSpot = React.useMemo(
    () => spots.find((s) => s.id === highlightedSpotName),
    [highlightedSpotName, spots]
  );
  React.useEffect(() => {
    if (highlightedSpot) {
      setSelectedMapName(highlightedSpot.map);
    }
  }, [highlightedSpot]);

  React.useEffect(() => {
    if (highlightedSpot) {
      const container = containerRef.current;
      container.scrollTo({
        left: highlightedSpot.x * scale - container.clientWidth / 2,
        top: highlightedSpot.y * scale - container.clientHeight / 2,
      });
    }
  }, [highlightedSpot, scale]);

  const { xy } = getQueryParam();
  useNativeEvent(containerRef.current, 'dblclick', (evt) => {
    if (xy) {
      alert(
        `x: ${Math.floor(evt.offsetX / scale)}, y: ${Math.floor(
          evt.offsetY / scale
        )}`
      );
    }
  });

  const [showSpotInfo, setShowSpotInfo] = React.useState();

  return (
    <div className="w-full h-full flex flex-col border-black border-2 relative">
      {!!showSpotInfo && (
        <SpotInfoDialog info={showSpotInfo} onClose={() => setShowSpotInfo()} />
      )}
      <div className="absolute m-3 left-0 top-0 z-[100] opacity-90 ">
        <TextField
          value={selectedMapName}
          select
          onChange={(evt) => {
            window.location.hash = '';
            setSelectedMapName(evt.target.value);
          }}
          className="mr-3 bg-white"
          size="small"
        >
          {maps.map((m) => (
            <MenuItem key={m.name} value={m.name}>
              {m.name}
            </MenuItem>
          ))}
        </TextField>
        <ButtonGroup variant="contained" aria-label="Zoom control Buttons">
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
            src={selectedMap.file}
          />

          {spotsInSelectedMap.map((spot) => (
            <Spot
              key={spot.id}
              info={spot}
              onClick={() => setShowSpotInfo(spot)}
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

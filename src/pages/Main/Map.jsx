import { LoadingView } from '@/components/LoadingView';
import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { updateUrl } from '@/utils/Url';
import { useHash } from '@/utils/useHash';
import { useNativeEvent } from '@/utils/useNativeEvent';
import { useQueryParam } from '@/utils/useQueryParam';
import { Button, ButtonGroup, Chip, MenuItem, TextField } from '@mui/material';
import React from 'react';
import Spot from './Spot';

const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 400;

export function Map() {
  /** @type {React.RefObject<HTMLDivElement>} */
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

  const { xy } = useQueryParam();

  useNativeEvent(containerRef.current, 'dblclick', (evt) => {
    if (xy) {
      alert(
        `x: ${Math.floor(evt.offsetX / scale)}, y: ${Math.floor(
          evt.offsetY / scale
        )}`
      );
    }
  });

  const [loadedMap, setLoadedMap] = React.useState('');

  const { isMobile } = useDisplayMode();

  const onChipClick = (evt) => {
    setSelectedMapName(evt.currentTarget.dataset.map);
  };

  return (
    <div className="w-full h-full flex flex-col border-black border-2 relative">
      <div
        className="w-full h-full overflow-auto select-none"
        ref={containerRef}
      >
        {loadedMap !== selectedMap.file && (
          <LoadingView className={'absolute'} />
        )}
        <div style={{ zoom: scale }} className="w-fit h-fit relative">
          <img
            alt="地圖"
            key={selectedMap.file}
            className="max-h-none max-w-none absolute left-0 top-0"
            src={selectedMap.file}
            onLoad={(evt) => setLoadedMap(selectedMap.file)}
          />

          {spotsInSelectedMap.map((spot) => (
            <Spot
              key={spot.id}
              info={spot}
              onClick={() => {
                updateUrl({
                  s: spot.id,
                  hash: spot.id,
                });
              }}
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
      <div className="absolute flex items-center p-4 z-[1000] opacity-90 bottom-0 right-0 desktop:top-0 desktop:left-[320px] desktop:bottom-auto desktop:right-auto gap-3">
        {isMobile && (
          <TextField
            value={selectedMapName}
            select
            onChange={(evt) => {
              window.location.hash = '';
              setSelectedMapName(evt.target.value);
            }}
            className="bg-white"
            size="small"
          >
            {maps.map((m) => (
              <MenuItem key={m.name} value={m.name}>
                {m.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <ButtonGroup
          variant="contained"
          aria-label="Zoom control Buttons"
          className="h-full"
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
        {!isMobile && (
          <div className="flex gap-2">
            {maps.map((m) => (
              <Chip
                key={m.name}
                label={m.name}
                data-map={m.name}
                className="select-none"
                color={m.name === selectedMapName ? 'primary' : 'default'}
                onClick={m.name === selectedMapName ? undefined : onChipClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { LoadingView } from '@/components/LoadingView';
import { useData } from '@/contexts/DataContext';
import { MapControl } from '@/pages/Main/Map/MapControl';
import { updateUrl } from '@/utils/Url';
import { useHash } from '@/utils/useHash';
import { useNativeEvent } from '@/utils/useNativeEvent';
import { useQueryParam } from '@/utils/useQueryParam';
import React from 'react';
import Spot from '../Spot';
import clsx from 'clsx';
import InstructionDialog from '@/pages/Instruction';
import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '@/VALUES';

const ZOOM_DEFAULT = ZOOM_MIN;

function between(min, value, max) {
  return Math.max(Math.min(value, max), min);
}

export function Map() {
  const [zoom, setZoom] = React.useState(ZOOM_DEFAULT);
  const scale = zoom / 100;

  const { spots, maps, config } = useData();
  const [currentMap, setCurrentMap] = React.useState(maps[0]);

  const spotsInCurrentMap = React.useMemo(() => {
    if (!currentMap) return [];
    return spots.filter((s) => s.map === currentMap.name && (s.x || s.y));
  }, [spots, currentMap]);

  const markedSpotId = useHash();
  const markedSpot = React.useMemo(() => {
    const spot = spots.find((s) => s.id === markedSpotId);
    if (spot && currentMap.name !== spot.name) {
      setCurrentMap(maps.find((m) => m.name === spot.map));
    }
    return spot;
  }, [markedSpotId, spots]);
  React.useEffect(() => {
    if (markedSpot) {
      setCurrentMap(maps.find((m) => m.name === markedSpot.map));
    }
  }, [markedSpot]);

  React.useEffect(() => {
    if (markedSpot) {
      const container = containerRef.current;
      container.scrollTo({
        left: markedSpot.x * scale - container.clientWidth / 2,
        top: markedSpot.y * scale - container.clientHeight / 2,
      });
    }
  }, [markedSpot, scale]);

  const [loadedMap, setLoadedMap] = React.useState('');

  const containerRef = React.useRef();

  const { xy } = useQueryParam();
  useNativeEvent(containerRef.current, 'dblclick', (evt) => {
    if (xy) {
      if (evt.target.id !== 'map') {
        return alert('此位置已在地圖之外');
      }
      alert(
        `x: ${Math.floor(evt.offsetX / scale)}, y: ${Math.floor(
          evt.offsetY / scale
        )}`
      );
    }
  });

  const mouseMoving = React.useRef();
  useNativeEvent(containerRef.current, 'mousedown', (evt) => {
    const map = containerRef.current;
    mouseMoving.current = {
      mouse: { x: evt.pageX, y: evt.pageY },
      map: {
        x: map.scrollLeft,
        y: map.scrollTop,
      },
    };
  });
  useNativeEvent(containerRef.current, 'mousemove', (evt) => {
    if (!mouseMoving.current) return;
    const { mouse, map } = mouseMoving.current;
    const elm = containerRef.current;
    elm.scrollLeft = map.x - evt.pageX + mouse.x;
    elm.scrollTop = map.y - evt.pageY + mouse.y;
  });

  useNativeEvent(containerRef.current, 'mouseup', () => {
    mouseMoving.current = null;
  });

  useNativeEvent(containerRef.current, 'mouseleave', () => {
    mouseMoving.current = null;
  });

  const [showInstruction, setShowInstruction] = React.useState(
    !localStorage.instruction
  );
  const [showQA, setShowQA] = React.useState(false);
  return (
    <>
      {!!showInstruction && (
        <InstructionDialog
          header="注意事項"
          closeBtn="我已經閱讀完上述指引，並且願意按照指引完成服務"
          content={config['指引']}
          onClose={() => {
            localStorage.setItem('instruction', true);
            setShowInstruction(false);
          }}
        />
      )}
      {!!showQA && (
        <InstructionDialog
          header="Q&A"
          content={config['QA']}
          onClose={() => setShowQA(false)}
        />
      )}
      <MapControl
        zoom={zoom}
        onZoomChange={(delta) => {
          if (delta === 0) return setZoom(ZOOM_DEFAULT);
          setZoom((z) => between(ZOOM_MIN, z + delta * ZOOM_STEP, ZOOM_MAX));
        }}
        currentMap={currentMap}
        onCurrentMapChange={(map) => {
          updateUrl({ hash: '' });
          setCurrentMap(map);
        }}
        onShowInstruction={() => setShowInstruction(true)}
        onShowQA={() => setShowQA(true)}
      />
      {loadedMap !== currentMap.file && (
        <div className="w-full h-full select-none">
          <LoadingView className={'absolute'} />
        </div>
      )}
      <div
        id="map-container"
        ref={containerRef}
        style={{
          '--scale': 1 / scale,
        }}
      >
        <div
          id="map"
          className="relative inline-block"
          style={{ zoom: scale }}
          onDragStart={(evt) => evt.preventDefault()}
        >
          <img
            alt="地圖"
            key={currentMap.file}
            className="max-h-none max-w-none select-none pointer-events-none"
            src={currentMap.file}
            onLoad={(evt) => {
              setLoadedMap(currentMap.file);
              if (!markedSpot) {
                const container = containerRef.current;
                container.scrollTo({
                  left: (container.scrollWidth - container.clientWidth) / 2,
                  top: (container.scrollHeight - container.clientHeight) / 2,
                });
              }
            }}
          />

          {spotsInCurrentMap.map((spot) => (
            <Spot
              key={spot.id}
              info={spot}
              scale={scale}
              className={clsx(
                `t-${spot.time}`,
                markedSpot &&
                  markedSpot.id === spot.id &&
                  'selected animate-bounce'
              )}
              onClick={() => {
                updateUrl({
                  s: spot.id,
                  b: '',
                  f: spot.id,
                  hash: spot.id,
                });
              }}
            />
          ))}
          {/* {!!markedSpot && (
            <Spot
              info={markedSpot}
              className="markedSpot z-0 pointer-events-none"
            />
          )} */}
        </div>
      </div>
    </>
  );
}

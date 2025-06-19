import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '@/VALUES';
import { Button, ButtonGroup, Chip, MenuItem, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export function MapControl({
  zoom,
  onZoomChange,
  currentMap,
  onCurrentMapChange,
  onShowInstruction,
  onShowQA,
}) {
  const { isMobile } = useDisplayMode();
  const { maps } = useData();

  return (
    <nav id="map-control">
      <Button
        variant="contained"
        className=" shadow-md shadow-gray-300 bg-gray-100 active:bg-blue-800 active:text-white text-blue-900 border-2 border-blue-700"
        onClick={onShowInstruction}
      >
        指引
      </Button>
      <Button
        variant="contained"
        className=" shadow-md shadow-gray-300 bg-gray-100 active:bg-blue-800 active:text-white text-blue-900 border-2 border-blue-700"
        onClick={onShowQA}
      >
        Q&amp;A
      </Button>
      {isMobile && (
        <TextField
          value={currentMap?.name ?? ''}
          select
          onChange={(evt) => {
            window.location.hash = '';
            onCurrentMapChange?.(maps.find((m) => m.name === evt.target.value));
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
        className={`shadow-none ${isMobile ? '' : 'ml-8'}`}
      >
        <Button
          className="w-10 h-10 rounded-l-full shadow-md shadow-gray-300 bg-gray-100 active:bg-blue-800 active:text-white text-blue-900 border-2 border-blue-700"
          disabled={zoom === ZOOM_MIN}
          onClick={() => onZoomChange?.(-1)}
        >
          <RemoveIcon />
        </Button>
        {/* <Button onClick={() => onZoomChange?.(0)}>{zoom}%</Button> */}
        <Button
          className="w-10 h-10 rounded-r-full shadow-md shadow-gray-300 bg-gray-100 active:bg-blue-800 active:text-white text-blue-900 border-2 border-blue-700"
          disabled={zoom === ZOOM_MAX}
          onClick={() => onZoomChange?.(1)}
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
      {!isMobile && (
        <div className="flex gap-2">
          {maps.map((m) => (
            <Chip
              key={m.name}
              label={m.name}
              data-map={m.name}
              className={`select-none shadow-md shadow-gray-400 text-lg p-2 border-2 ${
                m === currentMap
                  ? 'bg-blue-900 text-white border-teal-800'
                  : 'bg-gray-100 text-black border-blue-700'
              }`}
              onClick={() => onCurrentMapChange?.(m)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}

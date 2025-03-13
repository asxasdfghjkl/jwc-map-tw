import { useData } from '@/contexts/DataContext';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '@/VALUES';
import { Button, ButtonGroup, Chip, MenuItem, TextField } from '@mui/material';
import React from 'react';

export function MapControl({
  zoom,
  onZoomChange,
  currentMap,
  onCurrentMapChange,
}) {
  const { isMobile } = useDisplayMode();
  const { maps } = useData();

  return (
    <nav className="fixed flex items-center p-4 z-[1000] bottom-0 right-0 desktop:top-0 desktop:left-[320px] desktop:bottom-auto desktop:right-auto gap-3">
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
        className="h-full"
      >
        <Button disabled={zoom === ZOOM_MIN} onClick={() => onZoomChange?.(-1)}>
          -
        </Button>
        <Button onClick={() => onZoomChange?.(0)}>{zoom}%</Button>
        <Button disabled={zoom === ZOOM_MAX} onClick={() => onZoomChange?.(1)}>
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
              className={'select-none ' + m !== currentMap}
              color={m === currentMap ? 'primary' : 'default'}
              onClick={() => onCurrentMapChange?.(m)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}

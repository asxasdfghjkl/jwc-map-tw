import { BottomSheet } from '@/components/BottomSheet';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { DialogContent, DialogTitle, Paper, Portal } from '@mui/material';
import React from 'react';

const root = document.querySelector('#root');

const checkClass = (open) => {
  if (open) {
    root.classList.add('panel');
  } else {
    root.classList.remove('panel');
  }
};

export function InfoPanel({
  children,
  open,
  onClose,
  desktopHeader,
  mobileSummary,
}) {
  const { isMobile } = useDisplayMode();

  React.useLayoutEffect(() => {
    checkClass(open);
    return () => checkClass(false);
  }, [open]);

  if (!open) return null;

  if (isMobile) {
    return (
      <BottomSheet summary={mobileSummary} onClose={onClose}>
        {children}
      </BottomSheet>
    );
  }

  return (
    <Portal container={window.document.body}>
      <div className="panel-container">
        <Paper
          className="w-[330px] fixed top-0 left-0 bottom-0 z-[100] overflow-y-auto"
          elevation={3}
        >
          <DialogTitle className="opacity-0">placeholder</DialogTitle>
          {desktopHeader && (
            <DialogTitle className="mt-2 text-3xl">{desktopHeader}</DialogTitle>
          )}
          {children}
        </Paper>
      </div>
    </Portal>
  );
}

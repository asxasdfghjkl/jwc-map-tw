import { LoadingView } from '@/components/LoadingView';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { AppBar, Dialog, Fab, IconButton, Toolbar } from '@mui/material';
import { useData } from './../../contexts/DataContext';
import { Map } from './Map';
import React from 'react';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { Filters } from '@/pages/Main/Filters';
import { useHash } from '@/utils/useHash';

export default function Main() {
  const { loading } = useData();
  const { isMobile } = useDisplayMode();
  const hash = useHash();
  const [showFilter, setShowFilter] = React.useState(false);

  React.useEffect(() => {
    setShowFilter(false);
  }, [hash]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <LoadingView />
      </div>
    );
  }

  return (
    <main className="flex flex-row h-full w-full">
      <Map />
      <Dialog
        open={showFilter}
        fullScreen={isMobile}
        fullWidth
        maxWidth="sm"
        keepMounted
      >
        <AppBar position="sticky" color="default">
          <Toolbar className="justify-end">
            <IconButton onClick={() => setShowFilter(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Filters />
      </Dialog>
      <Fab
        onClick={() => setShowFilter(true)}
        className="fixed bottom-4 right-4"
      >
        <SearchIcon />
      </Fab>
    </main>
  );
}

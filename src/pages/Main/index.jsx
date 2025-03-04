import { LoadingView } from '@/components/LoadingView';
import { useDisplayMode } from '@/contexts/DisplayModeContext';
import { useHash } from '@/utils/useHash';
import { Close as CloseIcon } from '@mui/icons-material';
import { AppBar, Dialog, IconButton, Toolbar } from '@mui/material';
import { useData } from './../../contexts/DataContext';
import { Filters } from './Filters';
import { Map } from './Map';

export default function Main() {
  const { loading } = useData();
  const hash = useHash();
  const { isMobile } = useDisplayMode();

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <LoadingView />
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        <Filters />
        {!!hash && (
          <Dialog open fullScreen>
            <AppBar position="sticky">
              <Toolbar className="justify-end">
                <IconButton
                  color="inherit"
                  onClick={() => (window.location.hash = '')}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Map />
          </Dialog>
        )}
      </>
    );
  }

  return (
    <main className="flex flex-row h-full w-full">
      <div className="w-[400px] max-w-full p-3">
        <Filters />
      </div>
      <div className="grow">
        <Map />
      </div>
    </main>
  );
}

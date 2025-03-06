import React from 'react';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/Main/index';
import { AuthDialog } from '@/pages/AuthDialog';
import { DisplayModeContextProvider } from '@/contexts/DisplayModeContext';
function App() {
  const [password, setPassword] = React.useState(localStorage.password ?? '');

  return (
    <DataProvider>
      <DisplayModeContextProvider>
        {password === '1914' ? (
          <MainPage />
        ) : (
          <AuthDialog onChange={setPassword} />
        )}
      </DisplayModeContextProvider>
    </DataProvider>
  );
}

export default App;

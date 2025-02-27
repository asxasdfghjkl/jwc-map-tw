import React from 'react';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/Main/index';
import { AuthDialog } from '@/pages/AuthDialog';
function App() {
  const [password, setPassword] = React.useState(localStorage.password ?? '');

  return (
    <DataProvider>
      {password === '1914' ? (
        <MainPage />
      ) : (
        <AuthDialog onChange={setPassword} />
      )}
    </DataProvider>
  );
}

export default App;

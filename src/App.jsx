import React from 'react';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/Main/index';
function App() {
  const [password, setPassword] = React.useState(localStorage.password ?? '');

  return (
    <DataProvider>
      <MainPage />
    </DataProvider>
  );
}

export default App;

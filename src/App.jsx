import React from 'react';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/Main/index';
import { DisplayModeContextProvider } from '@/contexts/DisplayModeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif", // 這裡換成你要的字體
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <DisplayModeContextProvider>
          <MainPage />
        </DisplayModeContextProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

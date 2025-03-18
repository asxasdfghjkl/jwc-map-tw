import React from 'react';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/Main/index';
import { AuthDialog } from '@/pages/AuthDialog';
import { DisplayModeContextProvider } from '@/contexts/DisplayModeContext';
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const [password, setPassword] = React.useState(localStorage.password ?? '');
  const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // 這裡換成你要的字體
  },
});
  return (
    <ThemeProvider theme={theme}>
    <DataProvider>
      <DisplayModeContextProvider>
        {password === '1914' ? (
          <MainPage />
        ) : (
          <AuthDialog onChange={setPassword} />
        )}
      </DisplayModeContextProvider>
    </DataProvider>
    </ThemeProvider>
  );
}

export default App;

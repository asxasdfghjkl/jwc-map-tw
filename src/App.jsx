import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/Main/index';

function App() {
  return (
    <DataProvider>
      <MainPage />
    </DataProvider>
  );
}

export default App;

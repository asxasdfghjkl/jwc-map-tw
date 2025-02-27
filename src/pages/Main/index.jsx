import { CircularProgress, Typography } from '@mui/material';
import { useData } from './../../contexts/DataContext';
import { Filters } from './Filters';
import Map from './Map';

export default function Main() {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress />
        <Typography variant="h4" className="pl-3">
          載入中
        </Typography>
      </div>
    );
  }

  return (
    <main className="flex flex-col big:flex-row h-full w-full">
      <div className="w-[400px] max-w-full p-3">
        <Filters />
      </div>
      <div className="grow">
        <Map />
      </div>
    </main>
  );
}

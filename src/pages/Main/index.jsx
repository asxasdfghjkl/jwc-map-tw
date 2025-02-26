import { useData } from './../../contexts/DataContext';
import { CircularProgress, Typography } from '@mui/material';
import image from './../../assets/test.jpg';
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
    <main>
      <Map src={image} />
    </main>
  );
}

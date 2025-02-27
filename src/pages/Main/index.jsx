import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import image from './../../assets/test.jpg';
import { useData } from './../../contexts/DataContext';
import Filters from './Filters';
import Map from './Map';

export default function Main() {
  const { loading } = useData();

  const [selectedSpot, setSelectedSpot] = React.useState();

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
    <main className="flex flex-col lg:flex-row h-full w-full">
      <div className="w-[400px] max-w-full p-4">
        <Filters onSelectSpot={setSelectedSpot} />
      </div>
      <div className="grow">
        <Map src={image} focusingSpot={selectedSpot} />
      </div>
    </main>
  );
}

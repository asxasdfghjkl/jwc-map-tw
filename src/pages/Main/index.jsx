import { useData } from './../../contexts/DataContext';
import { CircularProgress, TextField, Typography } from '@mui/material';
import image from './../../assets/test.jpg';
import Map from './Map';
import Filters from './Filters';
import React from 'react';

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
    <main>
      <div className="w-[600px] max-w-full m-4">
        <Filters onSelectSpot={setSelectedSpot} />
      </div>
      <Map src={image} focusingSpot={selectedSpot} />
    </main>
  );
}

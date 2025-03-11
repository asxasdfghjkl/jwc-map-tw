import { LoadingView } from '@/components/LoadingView';
import { SearchBar } from '@/pages/Main/SearchBar';
import { useData } from './../../contexts/DataContext';
import { Map } from './Map';
import { BrotherInfoDialog } from './BrotherInfo';
import SpotInfoDialog from '@/pages/Main/SpotInfo';

export default function Main() {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <LoadingView />
      </div>
    );
  }

  return (
    <main className="flex flex-row h-full w-full">
      <SearchBar />

      <Map />
      <SpotInfoDialog />
      <BrotherInfoDialog />
      {/* <BottomSheet summary={<h1>hello</h1>} /> */}
    </main>
  );
}

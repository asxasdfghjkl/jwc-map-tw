import { TabView } from '@/components/TabView';
import BrotherFilter from './Brother';
import SpotFilter from './Spot';

export function Filters() {
  return (
    <TabView
      tabs={[
        { name: 'brother', label: '弟兄', render: <BrotherFilter /> },
        { name: 'map', label: '地點', render: <SpotFilter /> },
      ]}
    />
  );
}

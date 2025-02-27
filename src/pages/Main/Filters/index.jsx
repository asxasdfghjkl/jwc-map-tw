import { TabView } from '@/components/TabView';
import BrotherFilter from './Brother';
import MapFilter from './Map';

export function Filters() {
  return (
    <TabView
      tabs={[
        { name: 'brother', label: '弟兄', render: <BrotherFilter /> },
        { name: 'map', label: '會場', render: <MapFilter /> },
      ]}
    />
  );
}

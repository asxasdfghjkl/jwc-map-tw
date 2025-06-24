import { LoadingView } from '@/components/LoadingView';
import { makeDictionary } from '@/utils/makeDictionary';
import { GlobalStyles } from '@mui/material';
import React from 'react';
import useGoogleSheets from 'use-google-sheets';

/** @typedef {object} SiteData
 * @prop {SpotData[]} spots
 * @prop {BrotherData[]} brothers
 * @prop {MapData[]} maps
 * @prop {SearchOption[]} options
 * @prop {(brotherName: string) => string} getPhone
 * @prop {Record<string, TimeData} times
 * @prop {Record<string, string>} config
 * @prop {SupporterListData} supporters
 */

/** @typedef {object} SpotData
 * @prop {string} id
 * @prop {'supporters' | undefined} type
 * @prop {string} name
 * @prop {string} description
 * @prop {string} map
 * @prop {number} x
 * @prop {number} y
 * @prop {string} time
 * @prop {string} overseer
 * @prop {string} am5
 * @prop {string} pm5
 * @prop {string} am6
 * @prop {string} pm6
 * @prop {string} am7
 * @prop {string} pm7
 */

/** @typedef {object} BrotherData
 * @prop {string} id
 * @prop {string} serial
 * @prop {string} name
 * @prop {string} phone
 */

/** @typedef {object} MapData
 * @prop {string} name
 * @prop {string} file
 */

/** @typedef {object} SearchOption
 * @prop {string} label
 * @prop {string} value
 * @prop {string} type
 */

/** @typedef {object} TimeData
 * @prop {string} id
 * @prop {string} am
 * @prop {string} pm
 * @prop {string} color
 * @prop {string} altColor
 */

/** @typedef {object} SupporterListData
 * @prop {string[]} am5
 * @prop {string[]} am6
 * @prop {string[]} am7
 * @prop {string[]} pm5
 * @prop {string[]} pm6
 * @prop {string[]} pm7
 */

const context = React.createContext();

export function DataProvider({ children }) {
  const [_data, setData] = React.useState();

  const dataLoadRef = React.useRef(false);
  if (!dataLoadRef.current) {
    dataLoadRef.current = true;
    fetch(import.meta.env.VITE_DATA_JSON)
      .then((res) => res.json())
      .then((payload) => setData(payload));
  }

  /**@type {SiteData} */
  const parsedData = React.useMemo(() => {
    if (!_data) return null;

    const data = { ..._data, spots: [..._data.spots] };

    const phoneBook = makeDictionary(data.brothers, 'id', 'phone');
    const config = data.config;

    data.spots.push({
      id: config['機動人員ID'],
      name: config['機動人員位置名稱'],
      description: config['機動人員指引'],
      map: config['機動人員地圖'],
      x: parseInt(config['機動人員X'], 10),
      y: parseInt(config['機動人員Y'], 10),
      overseer: config['機動人員組長'],
      time: config['機動人員時段'],
      type: 'supporters',
    });

    const options = [
      ...data.brothers.map((b) => ({
        value: b.id,
        label: b.id,
        type: 'brother',
      })),
      ...data.spots.map((s) => ({
        value: s.id,
        label: s.id + ' ' + s.name,
        type: 'spot',
      })),
    ];

    return {
      /** @type {SpotData[]} */
      spots: data.spots,
      brothers: data.brothers,
      maps: data.maps,
      config,
      options,
      /** @param {string} brotherName */
      getPhone(brotherName) {
        return phoneBook[brotherName];
      },
      times: makeDictionary(data.times, 'id', (time) => time),
      colors: makeDictionary(
        data.times,
        (time) => `.t-${time.id}`,
        (time) => ({
          '--color': time.color,
          '--color-a': time.altColor,
        })
      ),
      supporters: data.supporters,
    };
  }, [_data]);

  if (!parsedData) return <LoadingView fullScreen />;
  return (
    <context.Provider value={parsedData}>
      <GlobalStyles styles={parsedData.colors} />
      {children}
    </context.Provider>
  );
}

/**
 * @returns {SiteData}
 */
export function useData() {
  return React.useContext(context);
}

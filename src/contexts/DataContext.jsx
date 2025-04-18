import { GlobalStyles } from '@mui/material';
import React from 'react';
import useGoogleSheets from 'use-google-sheets';

/** @typedef {object} SiteData
 * @prop {boolean} loading
 * @prop {SpotData[]} spots
 * @prop {BrotherData[]} brothers
 * @prop {MapData[]} maps
 * @prop {SearchOption[]} options
 * @prop {(brotherName: string) => string} getPhone
 * @prop {Record<string, TimeData} times
 */

/** @typedef {object} SpotData
 * @prop {string} id
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

const context = React.createContext();

export function DataProvider({ children }) {
  const { data, loading } = useGoogleSheets({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
    sheetsOptions: [
      { id: `地點`, headerRowIndex: 1 },
      { id: '招待員', headerRowIndex: 1 },
      { id: '地圖' },
      { id: '時段', headerRowIndex: 1 },
    ],
  });
  const parsedData = React.useMemo(() => {
    const spots = (data?.[0]?.data ?? []).filter(
      (spot) => spot.id && spot.map && (spot.x || spot.y)
    );

    const brothers = (data?.[1]?.data ?? []).filter((brother) => brother.name);

    const phoneBook = {};

    for (const b of brothers) {
      phoneBook[b.id] = b.phone;
    }

    const options = [
      ...brothers.map((b) => ({
        value: b.name,
        label: b.id,
        type: 'brother',
      })),
      ...spots.map((s) => ({
        value: s.id,
        label: s.id + ' ' + s.name,
        type: 'spot',
      })),
    ];

    const times = {};
    const colors = {};
    for (let time of data?.[3]?.data ?? []) {
      times[time.id] = time;
      colors[`.t-${time.id}`] = {
        '--color': time.color,
        '--color-a': time.altColor,
      };
    }

    return {
      loading,
      get spots() {
        return spots;
      },
      get brothers() {
        return brothers;
      },
      get maps() {
        return data?.[2]?.data ?? [];
      },
      get times() {
        return times;
      },
      get options() {
        return options;
      },
      /** @param {string} brotherName */
      getPhone(brotherName) {
        return phoneBook[brotherName];
      },
      colors,
    };
  }, [data, loading]);

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

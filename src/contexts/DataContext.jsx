import React from 'react';
import useGoogleSheets from 'use-google-sheets';

/** @typedef {object} SiteData
 * @prop {boolean} loading
 * @prop {SpotData[]} spots
 * @prop {ShiftData[]} shifts
 * @prop {BrotherData[]} brothers
 * @prop {MapData[]} maps
 * @prop {(brotherName: string) => string} getPhone
 */

/** @typedef {object} SpotData
 * @prop {string} id
 * @prop {string} name
 * @prop {string} description
 * @prop {string} map
 * @prop {number} x
 * @prop {number} y
 */

/** @typedef {object} ShiftData
 * @prop {string} date
 * @prop {string} spot spot.Id
 * @prop {string} am brother.name
 * @prop {string} pm brother.name
 */

/** @typedef {object} BrotherData
 * @prop {string} name
 * @prop {string} phone
 */

/** @typedef {object} MapData
 * @prop {string} name
 * @prop {string} file
 */
const context = React.createContext();

export function DataProvider({ children }) {
  const { data, loading } = useGoogleSheets({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
    sheetsOptions: [
      { id: `地點`, headerRowIndex: 1 },
      { id: `委派`, headerRowIndex: 1 },
      { id: '招待員', headerRowIndex: 1 },
      { id: '地圖' },
    ],
  });
  const parsedData = React.useMemo(() => {
    const phoneBook = {};

    if (data?.[2]?.data) {
      for (const b of data?.[2]?.data) {
        phoneBook[b.name] = b.phone;
      }
    }

    return {
      loading,
      get spots() {
        return data?.[0]?.data ?? [];
      },
      get shifts() {
        return data?.[1]?.data ?? [];
      },
      get brothers() {
        return data?.[2]?.data ?? [];
      },
      get maps() {
        return data?.[3]?.data ?? [];
      },
      /** @param {string} brotherName */
      getPhone(brotherName) {
        return phoneBook[brotherName];
      },
    };
  }, [data, loading]);

  return <context.Provider value={parsedData}>{children}</context.Provider>;
}

/**
 * @returns {SiteData}
 */
export function useData() {
  return React.useContext(context);
}

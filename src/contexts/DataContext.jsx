import React from 'react';
import useGoogleSheets from 'use-google-sheets';

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

  const value = {
    loading,
    get spots() {
      return data?.[0]?.data ?? [];
    },
    get assignments() {
      return data?.[2]?.data ?? [];
    },
    get brothers() {
      return data?.[1]?.data ?? [];
    },
    get maps() {
      return data?.[3]?.data ?? [];
    },
  };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useData() {
  return React.useContext(context);
}

import { useNativeEvent } from '@/utils/useNativeEvent';
import React from 'react';

const DisplayModeContext = React.createContext({ isMobile: true });

export function useDisplayMode() {
  return React.useContext(DisplayModeContext);
}

const DESKTOP_SIZE = 55 * 16;

export function DisplayModeContextProvider({ children }) {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < DESKTOP_SIZE
  );

  useNativeEvent(window, 'resize', () => {
    setIsMobile(window.innerWidth < DESKTOP_SIZE);
  });

  return (
    <DisplayModeContext.Provider value={{ isMobile }}>
      {children}
    </DisplayModeContext.Provider>
  );
}

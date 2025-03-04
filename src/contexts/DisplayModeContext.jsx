import { useNativeEvent } from '@/utils/useNativeEvent';
import React from 'react';

const DisplayModeContext = React.createContext({ isMobile: true });

export function useDisplayMode() {
  return React.useContext(DisplayModeContext);
}

export function DisplayModeContextProvider({ children }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 800);

  useNativeEvent(window, 'resize', () => {
    setIsMobile(window.innerWidth < 800);
  });

  return (
    <DisplayModeContext.Provider value={{ isMobile }}>
      {children}
    </DisplayModeContext.Provider>
  );
}

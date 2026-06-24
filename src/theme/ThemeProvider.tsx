import React, { createContext, useContext } from 'react';
import { tokens } from '../tokens';

type Theme = typeof tokens;

const ThemeContext = createContext<Theme>(tokens as Theme);

export default function ThemeProvider({ children }: { children: React.ReactNode }){
  return (
    <ThemeContext.Provider value={tokens}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(){
  return useContext(ThemeContext);
}

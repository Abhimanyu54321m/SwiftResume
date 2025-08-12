import React, { createContext, useState, useContext, useEffect } from 'react';

const themes = {
  light: {
    body: '#f0f2f5',
    text: '#333',
    primary: '#4a90e2',
    secondary: '#ffffff',
    headerBg: '#ffffff',
    borderColor: '#e0e0e0',
  },
  dark: {
    body: '#1a1a2e',
    text: '#e0e0e0',
    primary: '#e94560',
    secondary: '#16213e',
    headerBg: '#0f3460',
    borderColor: '#3a3a5e',
  },
  modern: {
    body: '#2d3748',
    text: '#e2e8f0',
    primary: '#4fd1c5',
    secondary: '#4a5568',
    headerBg: '#1a202c',
    borderColor: '#4a5568',
  },
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('dark');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('resumeTheme') || 'dark';
    setThemeName(savedTheme);
  }, []);

  const setCurrentTheme = (name) => {
    setThemeName(name);
    localStorage.setItem('resumeTheme', name); // Save theme to localStorage
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
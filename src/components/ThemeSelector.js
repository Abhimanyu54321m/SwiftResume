import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';

const SelectorWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${props => props.theme.secondary};
  padding: 0.5rem;
  border-radius: 8px;
`;

const ThemeButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.3s ease;
  
  /* --- VISIBILITY FIX --- */
  /* If active, use primary color for background and white for text */
  background-color: ${props => (props.active ? props.theme.primary : 'transparent')};
  /* If active, text is white. If inactive, use the theme's main text color. */
  color: ${props => (props.active ? '#ffffff' : props.theme.text)};

  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;

const ThemeSelector = () => {
  const { theme, themeName, setCurrentTheme, themes } = useTheme();
  const themeKeys = Object.keys(themes);

  return (
    <SelectorWrapper theme={theme}>
      {themeKeys.map(name => (
        <ThemeButton
          key={name}
          theme={theme} // Pass theme to styled component
          active={themeName === name}
          onClick={() => setCurrentTheme(name)}
        >
          {name}
        </ThemeButton>
      ))}
    </SelectorWrapper>
  );
};

export default ThemeSelector;
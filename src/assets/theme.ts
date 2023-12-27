import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  borderRadius: '8px',
  fontSize: {
    heading: '42px',
    title: '24px',
    body1: '16px',
    body: '14px',
    smallText: '12px',
  },
  fontWeight: {
    regular: '400',
    bold: '600',
  },

  colors: {
    // Main color
    primary: '#ff0000',
    // secondary: '#1d2b36',
    secondary: '#264284',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#9facbf',
    gray_light: '#c5cddb',
    gray_light2: '#f4f6f9',
    gray_dark: '#768499',
    primary_black: '#1e1e1e',
    // System color
    warning: '#FFC555',

    ash200: '#F9FAFA',
    ash300: '#F1F3F5',
    ash400: '#E5E9EC',
    ash500: '#D5DCE1',
    ash600: '#C5CED6',
    ash700: '#B7C2CC',
    ash800: '#A5B2BD',

    charcoal200: '#93A1B0',
    charcoal300: '#748494',
    charcoal400: '#556575',
    charcoal500: '#405261',
    charcoal600: '#314351',
    charcoal700: '#253642',
    charcoal800: '#1D2B36',

    green100: '#F5FFF9',
    green500: '#56C288',

    pink100: '#FFF9FB',
    pink900: '#F23459',

    yellow100: '#FFF9EF',
    yellow600: '#FAB347',
  },
};

export { theme };

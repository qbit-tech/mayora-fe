// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    fontSize: {
      heading: string;
      title: string;
      body1: string;
      body: string;
      smallText: string;
    };
    fontWeight: {
      regular: string;
      bold: string;
    };

    colors: {
      primary: string;
      secondary: string;
      black: string;
      white: string;
      warning: string;
      gray: string;
      gray_light: string;
      gray_light2: string;
      gray_dark: string;
      primary_black: string;

      ash200: string;
      ash300: string;
      ash400: string;
      ash500: string;
      ash600: string;
      ash700: string;
      ash800: string;

      charcoal200: string;
      charcoal300: string;
      charcoal400: string;
      charcoal500: string;
      charcoal600: string;
      charcoal700: string;
      charcoal800: string;

      green100: string;
      green500: string;

      pink100: string;
      pink900: string;

      yellow100: string;
      yellow600: string;
    };
  }
}

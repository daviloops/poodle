import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface Palette {
    pink: {
      main: string,
      light: string,
      dark: string,
    };
    brown: {
      main: string,
      light: string,
      dark: string,
    };
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        pink: {
          main: '#E8D3CE',
          light: '#E8D3CE',
          dark: '#E8D3CE',
        },
        brown: {
          main: '#5B4C49',
          light: '#5B4C49',
          dark: '#5B4C49',
        },
      },
    },
  },
});

export default theme;

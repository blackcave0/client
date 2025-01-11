import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      primary: '#6C63FF',
      secondary: '#FF6584',
      accent: '#32CD32',
    },
    dark: {
      100: '#1A1B1E',
      200: '#2C2D31',
      300: '#3E3F44',
      400: '#505158',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'dark.100',
        color: 'whiteAlpha.900',
        backgroundImage: 'linear-gradient(to bottom right, dark.100, dark.200)',
        minHeight: '100vh',
      },
    }),
  },
});

export default theme; 
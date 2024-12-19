import { createTheme } from '@mui/material';

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
  },
});

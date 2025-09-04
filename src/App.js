import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Snacker } from './Snacker';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff9800' }, // orange
    background: { default: '#000000' }, // black background
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snacker />
    </ThemeProvider>
  );
}

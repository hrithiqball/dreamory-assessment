import { CssBaseline, ThemeProvider } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Router } from './router.tsx'
import { theme } from './theme.tsx'

import { LocalizationProvider } from '@mui/x-date-pickers'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter children={<Router />} />
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>
)

import { Box } from '@mui/material'
import { Outlet } from 'react-router'

export function BaseLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Outlet />
    </Box>
  )
}

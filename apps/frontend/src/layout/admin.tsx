import { Box } from '@mui/material'
import { Outlet } from 'react-router'

export function AdminLayout() {
  return (
    <Box sx={{ p: 4 }}>
      <Outlet />
    </Box>
  )
}

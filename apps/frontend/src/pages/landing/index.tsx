import { Box, Button } from '@mui/material'

export function Landing() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Button variant="contained" href="/auth/login">
        Admin Portal
      </Button>
      <Button variant="contained" href="/events/" color="secondary">
        User Portal
      </Button>
    </Box>
  )
}

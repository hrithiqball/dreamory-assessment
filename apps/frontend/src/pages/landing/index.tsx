import { Box, Button } from '@mui/material'

export function Landing() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Button variant="contained" href="/auth/login">
        Sign In
      </Button>
    </Box>
  )
}

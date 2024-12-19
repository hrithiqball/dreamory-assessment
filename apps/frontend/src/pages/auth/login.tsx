import { Button, Card, FormControl, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export function Login() {
  const navigate = useNavigate()

  function onSignIn() {
    navigate('/admin/dashboard')
  }

  return (
    <Card sx={{ p: 4, gap: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5">Login</Typography>
      <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '24px 0' }}>
        <TextField size="small" placeholder="Email" />
        <TextField size="small" placeholder="Password" />
      </FormControl>
      <Button variant="contained" onClick={onSignIn}>
        Sign In
      </Button>
      <Button variant="text" href="/auth/register">
        Register
      </Button>
    </Card>
  )
}

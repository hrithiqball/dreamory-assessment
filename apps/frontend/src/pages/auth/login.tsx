import { Button, Card, CardActions, CardContent, CardHeader, FormControl } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { FormInputText } from '../../components/form/form-input-text'
import api from '../../lib/api'
import { LoginSchema, Login as LoginType } from '../../schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export function Login() {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: async (data: unknown) => {
      const res = await api.post('/auth/login', data)
      localStorage.setItem('access_token', res.data.access_token)
    },
    onSuccess: () => {
      toast.success('Login successful')
      navigate('/admin/dashboard')
    },
    onError: (err: AxiosError<{ message: string; statusCode: number }>) =>
      toast.error(err.response?.data.message)
  })

  function onSubmit(data: unknown) {
    loginMutation.mutate(data)
  }

  return (
    <>
      <Link to="/" style={{ fontSize: '12px', marginBottom: '16px' }}>
        Go Home
      </Link>
      <Card sx={{ p: 4, gap: 1, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Login" />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormInputText
              size="small"
              name="email"
              control={control}
              placeholder="Email"
              type="email"
            />
            <FormInputText
              size="small"
              name="password"
              control={control}
              placeholder="password"
              type="password"
            />
          </FormControl>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="small" variant="text" color="secondary" href="/auth/register">
            Register
          </Button>
          <Button size="small" variant="contained" onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

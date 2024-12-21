import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, CardContent, CardHeader, FormControl } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { login } from '../../api/auth'
import { FormInputText } from '../../components/form/form-input-text'
import { LoginInput, LoginSchema } from '../../schema/auth'

export function Login() {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: async (data: LoginInput) => await login(data),
    onSuccess: (res: string) => {
      localStorage.setItem('access_token', res)
      toast.success('Login successful')
      navigate('/admin/dashboard')
    },
    onError: err => {
      if (isAxiosError(err)) toast.error(err.response?.data.message)
      else toast.error('An error occurred')
    }
  })

  function onSubmit(data: LoginInput) {
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

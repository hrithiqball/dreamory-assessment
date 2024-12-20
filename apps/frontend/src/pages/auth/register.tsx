import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { FormInputText } from '../../components/form/form-input-text'
import api from '../../lib/api'
import { Register as RegisterType, RegisterSchema } from '../../schema/auth'

export function Register() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema)
  })

  const registerMutation = useMutation({
    mutationFn: async (data: unknown) => {
      const res = await api.post('/auth/register', data)
      localStorage.setItem('access_token', res.data.access_token)
    },
    onSuccess: () => navigate('/admin/dashboard')
  })

  function onSubmit(data: unknown) {
    registerMutation.mutate(data)
  }

  return (
    <>
      <Link to="/" style={{ fontSize: '12px', marginBottom: '16px' }}>
        Go Home
      </Link>
      <Card sx={{ p: 4, gap: 1, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Register" />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormInputText
            size="small"
            name="name"
            control={control}
            placeholder="Name"
            error={errors.name}
          />
          <FormInputText size="small" name="email" control={control} placeholder="Email" />
          <FormInputText
            size="small"
            name="password"
            control={control}
            placeholder="Password"
            type="password"
          />
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="text" size="small" color="secondary" href="/auth/login">
            Login
          </Button>
          <Button
            variant="contained"
            size="small"
            href="/auth/login"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

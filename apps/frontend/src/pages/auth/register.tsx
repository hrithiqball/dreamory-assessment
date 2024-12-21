import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { register } from '../../api/auth'
import { FormInputText } from '../../components/form/form-input-text'
import { RegisterInput, RegisterSchema } from '../../schema/auth'

export function Register() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema)
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInput) => await register(data),
    onSuccess: res => {
      localStorage.setItem('access_token', res)
      toast.success('Registration successful')
      navigate('/admin/dashboard')
    },
    onError: error => {
      if (isAxiosError(error)) toast.error(error.response?.data.message)
      else toast.error('An error occurred')
    }
  })

  function onSubmit(data: RegisterInput) {
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

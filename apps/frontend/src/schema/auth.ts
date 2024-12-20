import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type Login = z.infer<typeof LoginSchema>

export const RegisterSchema = z
  .object({
    name: z.string().min(2)
  })
  .merge(LoginSchema)

export type Register = z.infer<typeof RegisterSchema>

import { LoginInput, RegisterInput } from '../schema/auth'
import api from '../lib/api'

export async function login(data: LoginInput) {
  const response = await api.post('/auth/login', data)
  const { access_token } = response.data
  return access_token as string
}

export async function register(data: RegisterInput) {
  const response = await api.post('/auth/register', data)
  const { access_token } = response.data
  return access_token as string
}

export async function logout() {
  await api.post('/auth/logout')
  localStorage.removeItem('access_token')
}

export async function refresh() {
  const response = await api.post('/auth/refresh')
  const { access_token } = response.data
  localStorage.setItem('access_token', access_token)
  return response.data
}

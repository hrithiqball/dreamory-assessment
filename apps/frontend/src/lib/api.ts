import axios from 'axios'

interface AuthTokens {
  access_token: string
  refresh_token: string
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

const setTokens = (tokens: AuthTokens) => {
  localStorage.setItem('access_token', tokens.access_token)
  localStorage.setItem('refresh_token', tokens.refresh_token)
}

const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token))
  refreshSubscribers = []
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers.Authorization = token
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')
      try {
        const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
        const { access_token, refresh_token } = response.data
        setTokens({ access_token, refresh_token })

        originalRequest.headers.Authorization = access_token
        onTokenRefreshed(access_token)

        return api(originalRequest)
      } catch (err) {
        clearTokens()
        isRefreshing = false
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export { setTokens, clearTokens }
export default api

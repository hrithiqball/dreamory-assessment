import { createContext, useContext, useEffect, useState } from 'react'
import { refresh } from '../../api/auth'
import { useNavigate } from 'react-router'

interface AuthContextType {
  isAuthenticated: boolean
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  checkAuth: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        setIsAuthenticated(false)
        return
      }

      await refresh()
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      localStorage.removeItem('access_token')
      setIsAuthenticated(false)
      navigate('/auth/login')
    }
  }

  useEffect(() => {
    checkAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>{children}</AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)

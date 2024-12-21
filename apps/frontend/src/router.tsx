import { Route, Routes } from 'react-router'
import { Login } from './pages/auth/login'
import { Landing } from './pages/landing'
import { BaseLayout } from './layout/base'
import { Register } from './pages/auth/register'
import { Dashboard } from './pages/dashboard'
import { AdminLayout } from './layout/admin'
import { Events } from './pages/events'
import { AuthProvider } from './components/providers/auth-provider'

export function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Landing />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route path="events" element={<Events />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

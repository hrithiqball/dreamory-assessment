import { Route, Routes } from 'react-router'
import { Login } from './pages/auth/login'
import { Landing } from './pages/landing'
import { BaseLayout } from './layout/base'
import { Register } from './pages/auth/register'
import { Dashboard } from './pages/dashboard'
import { AdminLayout } from './layout/admin'
import { Events } from './pages/events'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Landing />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="events" element={<Events />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/utils/routes'

export const AuthLayout = () => {
    const { user } = useAuthStore()

    if (user) {
        return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />
    }

    return <Outlet />
}

export default AuthLayout

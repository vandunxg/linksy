import AuthLayout from '@/layouts/AuthLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import BookmarkPage from '@/pages/BookmarkPage'
import DashboardPage from '@/pages/DashboardPage'
import FolderPage from '@/pages/FolderPage'
import LoginPage from '@/pages/LoginPage'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: ProtectedLayout,
        children: [
            {
                path: '/dashboard',
                Component: DashboardPage,
            },
            {
                path: '/bookmarks',
                Component: BookmarkPage,
            },
            {
                path: '/folders',
                Component: FolderPage,
            },
        ],
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: LoginPage,
            },
        ],
    },
])

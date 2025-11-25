import { useAuthStore } from '@/stores/authStore'
import { Navigate, Outlet, useNavigate } from 'react-router'

import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ROUTES } from '@/utils/routes'
import { useEffect } from 'react'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useFolderStore } from '@/stores/folderStore'

const ProtectedLayout = () => {
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const { fetchBookmarks } = useBookmarkStore()
    const { fetchAllFolder } = useFolderStore()

    useEffect(() => {
        fetchBookmarks()
        fetchAllFolder()
    }, [fetchAllFolder, fetchBookmarks])

    useEffect(() => {
        if (location.pathname === '/admin') {
            navigate('/admin/dashboard', { replace: true })
        }
    }, [navigate])

    if (!user) {
        if (!user) {
            return <Navigate to={ROUTES.AUTH.LOGIN} replace />
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </div>

                    <ThemeToggle />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" /> */}
                    {/* <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="h-full w-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence> */}
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ProtectedLayout

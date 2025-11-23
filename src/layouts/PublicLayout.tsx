import { Outlet } from 'react-router'
import { PublicSidebar } from '@/components/public-sidebar'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'

const PublicLayout = () => {
    return (
        <SidebarProvider>
            <PublicSidebar />
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
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default PublicLayout

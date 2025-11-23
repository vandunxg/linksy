import { Folder, LayoutDashboard, Tag } from 'lucide-react'
import { ROUTES } from '@/utils/routes'

export const NavbarItems = [
    {
        title: 'Dashboard',
        url: ROUTES.ADMIN.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: 'Bookmarks',
        url: ROUTES.ADMIN.BOOKMARKS,
        icon: Tag,
    },
    {
        title: 'Folders',
        url: ROUTES.ADMIN.FOLDERS,
        icon: Folder,
    },
]

import * as React from 'react'
import { Command, Folder } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from '@/components/ui/sidebar'
import { useFolderStore } from '@/stores/folderStore'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ICON_MAP } from '@/utils/Constant'

export function PublicSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { folders, fetchAllFolder } = useFolderStore()
    const [searchParams] = useSearchParams()
    const currentFolderId = searchParams.get('folder')

    useEffect(() => {
        fetchAllFolder()
    }, [fetchAllFolder])

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Linksy
                                    </span>
                                    <span className="truncate text-xs">
                                        Public Collections
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Collections</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={!currentFolderId}
                                >
                                    <Link to="/">
                                        <Folder className="mr-2 h-4 w-4" />
                                        <span>All Bookmarks</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {folders.map((folder) => {
                                const Icon = ICON_MAP[folder.icon]
                                return (
                                    <SidebarMenuItem key={folder.id}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={
                                                currentFolderId === folder.id
                                            }
                                        >
                                            <Link to={`/?folder=${folder.id}`}>
                                                <Icon className="mr-2 h-4 w-4" />
                                                <span>{folder.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

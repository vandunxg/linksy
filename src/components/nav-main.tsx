import { Link, useLocation } from 'react-router'

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { type LucideIcon } from 'lucide-react'
import { act, useEffect, useState } from 'react'

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const [activePath, setActivePath] = useState<string>('')
    const location = useLocation()
    const locationPath = location.pathname

    const activeStyle =
        'bg-sidebar-accent text-sidebar-accent-foreground rounded-md'

    useEffect(() => {
        setActivePath(locationPath)
    }, [locationPath, setActivePath])

    return (
        <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => (
                    <SidebarMenuItem
                        className={`${activePath === item.url ? activeStyle : ''}`}
                        key={item.title}
                    >
                        <SidebarMenuButton asChild tooltip={item.title}>
                            <Link to={item.url}>
                                <item.icon className="size-4" />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

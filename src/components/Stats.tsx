'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Folder, Tag } from 'lucide-react'
import { Link } from 'react-router'

type Props = {
    totalBookmarks: number
    totalFolders: number
}

export default function Stats({ totalBookmarks, totalFolders }: Props) {
    const data = [
        {
            name: 'Total bookmarks',
            value: totalBookmarks,
            changeType: 'positive',
            href: '/admin/bookmarks',
            icon: Tag,
        },
        {
            name: 'Total folders',
            value: totalFolders,
            changeType: 'positive',
            href: '/admin/folders',
            icon: Folder,
        },
    ]

    return (
        <div className="flex w-full items-center justify-center">
            <dl className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {data.map((item) => (
                    <Card key={item.name} className="gap-0 p-0">
                        <CardContent className="p-6">
                            <dd className="flex items-start justify-between space-x-2">
                                <span className="text-muted-foreground truncate text-sm">
                                    {item.name}
                                </span>
                                <span
                                    className={cn(
                                        'text-sm font-medium',
                                        item.changeType === 'positive'
                                            ? 'text-emerald-700 dark:text-emerald-500'
                                            : 'text-red-700 dark:text-red-500'
                                    )}
                                >
                                    <item.icon />
                                </span>
                            </dd>
                            <dd className="text-foreground mt-1 text-3xl font-semibold">
                                {item.value}
                            </dd>
                        </CardContent>
                        <CardFooter className="border-border flex justify-end border-t p-0!">
                            <Link
                                to={item.href}
                                className="text-primary hover:text-primary/90 px-6 py-3 text-sm font-medium"
                            >
                                View more &#8594;
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </dl>
        </div>
    )
}

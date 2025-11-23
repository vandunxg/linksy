import { Button } from '@/components/ui/button'
import { MoreHorizontal, ExternalLink } from 'lucide-react'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { BookmarkResponse } from '@/types'
import { LoadingSpinner } from './LoadingSpinner'

type Props = {
    data: BookmarkResponse[]
    loading: boolean
}

export function RecentBookmarkTable({ data, loading }: Props) {
    if (loading) {
        return (
            <div className="flex h-40 items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="text-muted-foreground flex h-40 items-center justify-center">
                No recent bookmarks found.
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="hidden items-center justify-start md:flex lg:flex">
                        Added
                    </TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((bookmark) => (
                    <TableRow key={bookmark.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
                                    alt="icon"
                                    className="h-4 w-4 rounded-sm"
                                />
                                <span
                                    className="line-clamp-1 max-w-[150px]"
                                    title={bookmark.title}
                                >
                                    {bookmark.title}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="line-clamp-1 max-w-[200px] text-blue-500 hover:underline"
                                title={bookmark.url}
                            >
                                {bookmark.url}
                            </a>
                        </TableCell>
                        <TableCell className="hidden md:block lg:block">
                            {new Date(bookmark.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                    >
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={bookmark.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />{' '}
                                            Open link
                                        </a>
                                    </DropdownMenuItem>
                                    {/* Edit and Delete can be added here if needed, 
                                        but for "Recent" view, maybe just Open is enough or 
                                        we need to pass handlers like onDelete 
                                    */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

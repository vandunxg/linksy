import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
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
import { Badge } from './ui/badge'

export function RecentBookmarkTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Folders</TableHead>
                    <TableHead className="hidden md:block lg:block">
                        Tags
                    </TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell className="hidden md:block lg:block">
                        <div className="flex flex-wrap items-center justify-start space-x-1">
                            <Badge>dev</Badge>
                            <Badge>dev</Badge>
                        </div>
                    </TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => alert('View invoice')}
                                >
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert('Delete invoice')}
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />{' '}
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell className="hidden md:block lg:block">
                        <div className="flex flex-wrap items-center justify-start space-x-1">
                            <Badge>dev</Badge>
                            <Badge>dev</Badge>
                        </div>
                    </TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => alert('View invoice')}
                                >
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert('Delete invoice')}
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />{' '}
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell className="hidden md:block lg:block">
                        <div className="flex flex-wrap items-center justify-start space-x-1">
                            <Badge>dev</Badge>
                            <Badge>dev</Badge>
                        </div>
                    </TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => alert('View invoice')}
                                >
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert('Delete invoice')}
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />{' '}
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell className="hidden md:block lg:block">
                        <div className="flex flex-wrap items-center justify-start space-x-1">
                            <Badge>dev</Badge>
                            <Badge>dev</Badge>
                        </div>
                    </TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => alert('View invoice')}
                                >
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert('Delete invoice')}
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />{' '}
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

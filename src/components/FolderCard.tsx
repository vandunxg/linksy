import {  MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { FolderResponse } from '@/types'
import { ICON_MAP } from '@/utils/Constant'
import { AlertDeleteDialog } from './AlertDeleteDialog'
import { useState } from 'react'

type Props = {
    data: FolderResponse
}

export function FolderCard({ data }: Props) {
    const FolderIcon = ICON_MAP[data.icon]
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
    const [targetFolderId, setTargetFolderId] = useState<string>('')

    return (
        <>
            <Card className="flex min-h-[200px] min-w-[300px] flex-col justify-between p-4 transition-colors sm:p-5">
                <CardHeader className="p-0">
                    <div className="flex items-center justify-around gap-2">
                        {/* LEFT */}
                        <div className="flex w-[80%] min-w-0 flex-1 items-center gap-3 overflow-hidden">
                            {/* Icon */}
                            <div className="bg-muted flex shrink-0 items-center justify-center rounded-lg p-2">
                                <FolderIcon
                                    size={22}
                                    className="text-primary"
                                />
                            </div>

                            {/* Text block */}
                            <div className="flex min-w-0 flex-col overflow-hidden">
                                <p
                                    title={data?.name}
                                    className="text-accent-foreground line-clamp-1 text-lg font-medium"
                                >
                                    {data?.name && data.name.length > 15
                                        ? data.name.slice(0, 15) + '…'
                                        : data?.name || 'Untitled Folder'}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    245 bookmarks
                                </p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 shrink-0 p-0"
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
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setIsOpenDeleteDialog(true)
                                            setTargetFolderId(data.id)
                                        }}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4 text-red-500" />{' '}
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                {/* FOOTER */}
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-1 text-sm">
                        {data?.description}
                    </p>
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Bookmark
                    </Button>
                </CardContent>
            </Card>
            <AlertDeleteDialog
                isOpen={isOpenDeleteDialog}
                setIsOpen={setIsOpenDeleteDialog}
                targetId={targetFolderId}
            />
        </>
    )
}

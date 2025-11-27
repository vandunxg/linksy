import { MoreHorizontal, Pencil, Plus, Trash2, Globe } from 'lucide-react'
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
import { useState, useMemo } from 'react'
import { EditFolderDialog } from './EditFolderDialog'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useFolderStore } from '@/stores/folderStore'
import { toast } from 'sonner'

type Props = {
    data: FolderResponse
    onAddBookmark?: (folderId: string) => void
    onClick?: (folderId: string) => void
}

export function FolderCard({ data, onAddBookmark, onClick }: Props) {
    const { deleteFolder } = useFolderStore()

    const FolderIcon = ICON_MAP[data.icon]
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
    const [targetFolderId, setTargetFolderId] = useState<string>('')
    const [isEditFolder, setIsEditFolder] = useState<boolean>(false)
    const [folderEditTarget, setFolderEditTarget] =
        useState<FolderResponse | null>(null)

    const { bookmarks } = useBookmarkStore()

    // Calculate real bookmark count for this folder
    const bookmarkCount = useMemo(() => {
        return bookmarks.filter((bookmark) => bookmark.folder_id === data.id)
            .length
    }, [bookmarks, data.id])

    return (
        <>
            <Card
                className="hover:border-primary/50 flex min-h-[180px] w-full cursor-pointer flex-col justify-between p-3 transition-shadow hover:shadow-lg sm:min-h-[200px] sm:p-4 md:p-5"
                onClick={() => onClick?.(data.id)}
            >
                <CardHeader className="p-0">
                    <div className="flex items-start justify-between gap-2">
                        {/* LEFT */}
                        <div className="flex min-w-0 flex-1 items-start gap-2 overflow-hidden sm:gap-3">
                            {/* Icon */}
                            <div className="bg-muted flex shrink-0 items-center justify-center rounded-lg p-1.5 sm:p-2">
                                <FolderIcon
                                    size={20}
                                    className="text-primary sm:h-[22px] sm:w-[22px]"
                                />
                            </div>

                            {/* Text block */}
                            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                                <p
                                    title={data?.name}
                                    className="text-accent-foreground line-clamp-1 text-base font-medium break-all sm:text-lg"
                                >
                                    {data?.name && data.name.length > 15
                                        ? data.name.slice(0, 15) + '…'
                                        : data?.name || 'Untitled Folder'}
                                </p>
                                <p className="text-muted-foreground text-xs sm:text-sm">
                                    {bookmarkCount}{' '}
                                    {bookmarkCount === 1
                                        ? 'bookmark'
                                        : 'bookmarks'}
                                    {data.is_public && (
                                        <span className="ml-2 inline-flex items-center gap-1 text-xs text-blue-500">
                                            <Globe size={12} /> Public
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex shrink-0 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-7 w-7 shrink-0 p-0 sm:h-8 sm:w-8"
                                        onClick={(e) => e.stopPropagation()}
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
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setFolderEditTarget(data)
                                            setIsEditFolder((prev) => !prev)
                                        }}
                                    >
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.stopPropagation()

                                            if (bookmarkCount > 0) {
                                                toast.error(
                                                    'Folder has bookmarks, cannot delete'
                                                )
                                                return
                                            }

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

                <CardContent className="mt-3 space-y-3 p-0 sm:mt-4 sm:space-y-4">
                    <p className="text-muted-foreground line-clamp-2 text-xs wrap-break-word sm:text-sm">
                        {data?.description || 'No description'}
                    </p>
                    <Button
                        variant="outline"
                        className="h-9 w-full text-sm sm:h-10"
                        onClick={(e) => {
                            e.stopPropagation()
                            onAddBookmark?.(data.id)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Bookmark
                    </Button>
                </CardContent>
            </Card>
            <AlertDeleteDialog
                isOpen={isOpenDeleteDialog}
                setIsOpen={setIsOpenDeleteDialog}
                onConfirm={() => {
                    deleteFolder(targetFolderId)
                }}
            />
            <EditFolderDialog
                isOpen={isEditFolder}
                setIsOpen={setIsEditFolder}
                folder={folderEditTarget}
            />
        </>
    )
}

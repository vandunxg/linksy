import { ExternalLink, MoreVertical, Trash2, Pencil } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { FaHeart, FaRegHeart } from 'react-icons/fa'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDeleteDialog } from './AlertDeleteDialog'
import { useState } from 'react'
import { getWebsiteLogo } from '@/lib/utils'
import type { BookmarkResponse } from '@/types'

type Props = {
    bookmark: BookmarkResponse
    onDelete: (id: string) => void
    onClick?: (bookmark: BookmarkResponse) => void
    isPublic?: boolean
}

import { EditBookmarkDialog } from './EditBookmarkDialog'

export function BookmarkCard({
    bookmark,
    onDelete,
    onClick,
    isPublic = false,
}: Props) {
    const webLogo = getWebsiteLogo(bookmark.url)
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
    const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false)
    const [isFav, setIsFav] = useState<boolean>(false)

    return (
        <>
            <Card
                className="hover:border-primary/50 flex min-h-[150px] w-full cursor-pointer flex-col justify-between p-3 transition-all hover:shadow-lg sm:p-4 md:p-5"
                onClick={() => onClick?.(bookmark)}
            >
                <CardHeader className="p-0">
                    <div className="flex items-start justify-between gap-2">
                        {/* LEFT */}
                        <div className="flex min-w-0 flex-1 items-start gap-2 overflow-hidden sm:gap-3">
                            {/* Icon */}
                            <div className="bg-muted flex shrink-0 items-center justify-center rounded-lg p-1.5 sm:p-2">
                                <img
                                    src={webLogo}
                                    className="h-5 w-5 rounded-md sm:h-6 sm:w-6"
                                    alt="logo"
                                />
                            </div>

                            {/* Text block */}
                            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                                <p
                                    title={bookmark.title}
                                    className="text-accent-foreground line-clamp-1 text-base font-medium break-all sm:text-lg"
                                >
                                    {bookmark.title}
                                </p>
                                <p className="text-muted-foreground line-clamp-1 text-[10px] break-all sm:text-[11px]">
                                    {bookmark.url}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex shrink-0 items-center">
                            {isFav ? (
                                <FaHeart
                                    size={16}
                                    className="sm:h-[18px] sm:w-[18px]"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsFav((prev) => !prev)
                                    }}
                                />
                            ) : (
                                <FaRegHeart
                                    size={16}
                                    className="sm:h-[18px] sm:w-[18px]"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsFav((prev) => !prev)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>

                <div className="border-border flex w-full items-center justify-between border-t pt-3">
                    <div className="text-muted-foreground text-xs">
                        {/* 1234 visits - Placeholder for now */}
                        {new Date(bookmark.created_at).toLocaleDateString()}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 shrink-0 p-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />{' '}
                                    Open link
                                </a>
                            </DropdownMenuItem>
                            {!isPublic ? (
                                <>
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setIsOpenEditDialog(true)
                                        }}
                                    >
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setIsOpenDeleteDialog(true)
                                        }}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4 text-red-500" />{' '}
                                        Delete
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <></>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Card>
            <AlertDeleteDialog
                isOpen={isOpenDeleteDialog}
                setIsOpen={setIsOpenDeleteDialog}
                onConfirm={() => onDelete(bookmark.id)}
            />
            <EditBookmarkDialog
                isOpen={isOpenEditDialog}
                setIsOpen={setIsOpenEditDialog}
                bookmark={bookmark}
            />
        </>
    )
}

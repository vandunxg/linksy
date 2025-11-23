import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { BookmarkResponse } from '@/types'
import { getWebsiteLogo } from '@/lib/utils'
import { Calendar, ExternalLink, Folder } from 'lucide-react'
import { useFolderStore } from '@/stores/folderStore'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    bookmark: BookmarkResponse | null
}

export function BookmarkDetailDialog({ isOpen, setIsOpen, bookmark }: Props) {
    const { folders } = useFolderStore()

    if (!bookmark) return null

    const webLogo = getWebsiteLogo(bookmark.url)
    const folderName = folders.find((f) => f.id === bookmark.folder_id)?.name

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="mb-2 flex items-center gap-3">
                        <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-2">
                            <img
                                src={webLogo}
                                className="h-full w-full rounded-md object-contain"
                                alt="logo"
                            />
                        </div>
                        <DialogTitle className="text-xl leading-tight">
                            {bookmark.title}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="hidden">
                        Bookmark Details
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* URL */}
                    <div className="text-muted-foreground text-sm break-all">
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary flex items-center gap-1 hover:underline"
                        >
                            {bookmark.url}
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>

                    {/* Description */}
                    {bookmark.description && (
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                            {bookmark.description}
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center justify-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>
                                Added{' '}
                                {new Date(
                                    bookmark.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        {folderName && (
                            <div className="flex items-center justify-center gap-1.5">
                                <Folder className="h-4 w-4" />
                                <span>{folderName}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button asChild>
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Link
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

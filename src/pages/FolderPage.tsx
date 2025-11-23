import { AddFolderDialog } from '@/components/AddFolderDialog'
import { AddBookmarkDialog } from '@/components/AddBookmarkDialog'
import { FolderCard } from '@/components/FolderCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useFolderStore } from '@/stores/folderStore'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { Plus, Search, ArrowUpDown } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FOLDER_ACTION } from '@/utils/Constant'
import { useNavigate } from 'react-router-dom'

const FolderPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState<boolean>(false)
    const [targetFolderId, setTargetFolderId] = useState<string>('')

    const { folders, fetchAllFolder, loading, actionType } = useFolderStore()
    const { addBookmark } = useBookmarkStore()

    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('newest')
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllFolder()
    }, [fetchAllFolder])

    const filteredFolders = useMemo(() => {
        let result = [...folders]

        // Filter
        if (searchQuery) {
            result = result.filter((folder) =>
                folder.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name)
                case 'name-desc':
                    return b.name.localeCompare(a.name)
                case 'oldest':
                    return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    )
                case 'newest':
                default:
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
            }
        })

        return result
    }, [folders, searchQuery, sortBy])

    const handleAddBookmark = (folderId: string) => {
        setTargetFolderId(folderId)
        setIsAddBookmarkOpen(true)
    }

    const handleFolderClick = (folderId: string) => {
        navigate(`/admin/bookmarks?folder=${folderId}`)
    }

    return (
        <>
            <div className="space-y-6 p-5">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                All Folders
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                {folders.length} folders saved
                            </p>
                        </div>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add folder
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative w-full md:w-[300px]">
                            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                            <Input
                                placeholder="Search folders..."
                                className="w-full pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        <ArrowUpDown className="h-4 w-4" />
                                        Sort
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Sort by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => setSortBy('newest')}
                                    >
                                        Newest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortBy('oldest')}
                                    >
                                        Oldest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortBy('name-asc')}
                                    >
                                        Name (A-Z)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortBy('name-desc')}
                                    >
                                        Name (Z-A)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {loading && actionType === FOLDER_ACTION.FETCH_FOLDER ? (
                    <LoadingSpinner />
                ) : (
                    <motion.div
                        className="grid min-w-0 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredFolders.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FolderCard
                                        data={item}
                                        onAddBookmark={handleAddBookmark}
                                        onClick={handleFolderClick}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {filteredFolders.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-muted-foreground col-span-full py-10 text-center"
                            >
                                No folders found matching your search.
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            <AddFolderDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            />
            <AddBookmarkDialog
                isOpen={isAddBookmarkOpen}
                setIsOpen={setIsAddBookmarkOpen}
                onAddBookmark={addBookmark}
                defaultFolderId={targetFolderId}
            />
        </>
    )
}

export default FolderPage

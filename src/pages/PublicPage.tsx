import { BookmarkCard } from '@/components/BookmarkCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useFolderStore } from '@/stores/folderStore'
import { ICON_MAP } from '@/utils/Constant'
import { Search, Loader2, Filter, ArrowUpDown } from 'lucide-react'
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookmarkDetailDialog } from '@/components/BookmarkDetailDialog'
import type { BookmarkResponse } from '@/types'

const ITEMS_PER_PAGE = 20

const PublicPage = () => {
    const { publicBookmarks, fetchPublicBookmarks, loading } =
        useBookmarkStore()
    const { publicFolder } = useFolderStore()
    const [searchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('date-newest')

    const [selectedBookmark, setSelectedBookmark] =
        useState<BookmarkResponse | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const folderId = searchParams.get('folder')
    const currentFolder = publicFolder.find((f) => f.id === folderId)

    // Pagination State
    const [page, setPage] = useState(1)
    const observerTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchPublicBookmarks()
    }, [fetchPublicBookmarks])

    // Reset page when filters change
    useEffect(() => {
        setPage(1)
    }, [searchQuery, folderId, sortOption])

    const filteredBookmarks = useMemo(() => {
        let result = [...publicBookmarks]

        if (folderId) {
            result = result.filter((b) => b.folder_id === folderId)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (b) =>
                    b.title.toLowerCase().includes(query) ||
                    b.url.toLowerCase().includes(query) ||
                    b.description?.toLowerCase().includes(query)
            )
        }

        if (sortOption === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sortOption === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title))
        } else if (sortOption === 'date-newest') {
            result.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            )
        } else if (sortOption === 'date-oldest') {
            result.sort(
                (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
            )
        }

        return result
    }, [publicBookmarks, folderId, searchQuery, sortOption])

    const displayedBookmarks = useMemo(() => {
        return filteredBookmarks.slice(0, page * ITEMS_PER_PAGE)
    }, [filteredBookmarks, page])

    const hasMore = displayedBookmarks.length < filteredBookmarks.length

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries
            if (target.isIntersecting && hasMore) {
                setPage((prev) => prev + 1)
            }
        },
        [hasMore]
    )

    useEffect(() => {
        const element = observerTarget.current
        if (!element) return

        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        })

        observer.observe(element)
        return () => observer.disconnect()
    }, [handleObserver])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            className="space-y-6 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="flex items-center gap-2 text-2xl font-semibold">
                            {currentFolder ? (
                                <>
                                    {(() => {
                                        const Icon =
                                            ICON_MAP[currentFolder.icon]
                                        return <Icon className="text-primary" />
                                    })()}
                                    {currentFolder.name}
                                </>
                            ) : (
                                'All Public Bookmarks'
                            )}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {filteredBookmarks.length} bookmarks found
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:w-72">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input
                            placeholder="Search bookmarks..."
                            className="w-full pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between md:w-[180px]"
                                >
                                    <span className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        {folderId
                                            ? publicFolder.find(
                                                  (f) => f.id === folderId
                                              )?.name || 'Select Folder'
                                            : 'All Folders'}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[200px]"
                            >
                                <DropdownMenuLabel>
                                    Filter by Folder
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/"
                                        className="flex w-full cursor-pointer"
                                    >
                                        All Folders
                                    </Link>
                                </DropdownMenuItem>
                                {publicFolder.map((folder) => (
                                    <DropdownMenuItem key={folder.id} asChild>
                                        <Link
                                            to={`/?folder=${folder.id}`}
                                            className="flex w-full cursor-pointer"
                                        >
                                            {folder.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between md:w-[180px]"
                                >
                                    <span className="flex items-center gap-2">
                                        <ArrowUpDown className="h-4 w-4" />
                                        Sort by
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[200px]"
                            >
                                <DropdownMenuLabel>
                                    Sort Options
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setSortOption('date-newest')}
                                >
                                    Date: Newest First
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSortOption('date-oldest')}
                                >
                                    Date: Oldest First
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSortOption('name-asc')}
                                >
                                    Name: A-Z
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSortOption('name-desc')}
                                >
                                    Name: Z-A
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex h-40 items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <motion.div
                        className="grid min-w-0 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="popLayout">
                            {displayedBookmarks.map((bookmark) => (
                                <motion.div
                                    key={bookmark.id}
                                    layout
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <BookmarkCard
                                        bookmark={bookmark}
                                        isPublic={true}
                                        onDelete={() => {}}
                                        onClick={(b) => {
                                            setSelectedBookmark(b)
                                            setIsDetailOpen(true)
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredBookmarks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-muted-foreground col-span-full py-10 text-center"
                        >
                            No bookmarks found.
                        </motion.div>
                    )}

                    {/* Infinite Scroll Trigger & Loading Indicator */}
                    {hasMore && (
                        <div
                            ref={observerTarget}
                            className="flex justify-center py-8"
                        >
                            <Loader2 className="text-primary h-6 w-6 animate-spin" />
                        </div>
                    )}
                </>
            )}

            <BookmarkDetailDialog
                isOpen={isDetailOpen}
                setIsOpen={setIsDetailOpen}
                bookmark={selectedBookmark}
            />
        </motion.div>
    )
}

export default PublicPage

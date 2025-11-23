import RecentBookmark from '@/components/RecentBookmark'
import RecentFolder from '@/components/RecentFolder'
import Stats from '@/components/Stats'
import { Analytics } from '@/components/Analytics'
import { useFolderStore } from '@/stores/folderStore'
import { useBookmarkStore } from '@/stores/bookmarkStore'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const DashboardPage = () => {
    const {
        recentFolders,
        folders,
        getRecentFolders,
        fetchAllFolder,
        loading: fetchCurrentFolderLoading,
    } = useFolderStore()

    const {
        bookmarks,
        fetchBookmarks,
        loading: fetchBookmarksLoading,
    } = useBookmarkStore()

    useEffect(() => {
        getRecentFolders()
        fetchAllFolder()
        fetchBookmarks()
    }, [getRecentFolders, fetchAllFolder, fetchBookmarks])

    return (
        <motion.div
            className="space-y-6 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <Stats
                totalBookmarks={bookmarks.length}
                totalFolders={folders.length}
            />

            <Analytics bookmarks={bookmarks} folders={folders} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}

                    <RecentBookmark
                        bookmarks={bookmarks.slice(0, 5)}
                        loading={fetchBookmarksLoading}
                    />

                    {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}
                </div>
                <div className="space-y-8">
                    {/* <div className="bg-muted/50 aspect-video h-[740px] w-full rounded-xl" /> */}
                    <RecentFolder
                        fetchCurrentFolderLoading={fetchCurrentFolderLoading}
                        recentFolders={recentFolders}
                    />
                    {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}
                </div>
            </div>
        </motion.div>
    )
}

export default DashboardPage

import RecentBookmark from '@/components/RecentBookmark'
import RecentFolder from '@/components/RecentFolder'
import Stats from '@/components/Stats'
import { useFolderStore } from '@/stores/folderStore'
import { useEffect } from 'react'

const DashboardPage = () => {
    const { recentFolders, getRecentFolders } = useFolderStore()

    useEffect(() => {
        getRecentFolders()
    }, [getRecentFolders])

    return (
        <div className="space-y-6 p-5">
            <Stats />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}

                    <RecentBookmark />

                    {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}
                </div>
                <div className="space-y-8">
                    {/* <div className="bg-muted/50 aspect-video h-[740px] w-full rounded-xl" /> */}
                    <RecentFolder recentFolders={recentFolders} />
                    {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage

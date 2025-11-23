import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { FolderResponse } from '@/types'
import RecentFolderItem from './RecentFolderItem'
import { LoadingSpinner } from './LoadingSpinner'

type Props = {
    recentFolders: FolderResponse[]
    fetchCurrentFolderLoading: boolean
}

const RecentFolder = ({ recentFolders, fetchCurrentFolderLoading }: Props) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Folder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {fetchCurrentFolderLoading ? (
                        <LoadingSpinner />
                    ) : (
                        recentFolders.map((item) => (
                            <RecentFolderItem folder={item} />
                        ))
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default RecentFolder

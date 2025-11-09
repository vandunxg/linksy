import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { FolderResponse } from '@/types'
import RecentFolderItem from './RecentFolderItem'

type Props = {
    recentFolders: FolderResponse[]
}

const RecentFolder = ({ recentFolders }: Props) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Folder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentFolders.map((item) => (
                        <RecentFolderItem folder={item} />
                    ))}
                </CardContent>
            </Card>
        </>
    )
}

export default RecentFolder

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { RecentBookmarkTable } from './RecentBookmarkTable'
import type { BookmarkResponse } from '@/types'

type Props = {
    bookmarks: BookmarkResponse[]
    loading: boolean
}

const RecentBookmark = ({ bookmarks, loading }: Props) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Bookmarks</CardTitle>
                </CardHeader>
                <CardContent>
                    <RecentBookmarkTable data={bookmarks} loading={loading} />
                </CardContent>
            </Card>
        </>
    )
}

export default RecentBookmark

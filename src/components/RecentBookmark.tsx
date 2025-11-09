import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { RecentBookmarkTable } from './RecentBookmarkTable'

const RecentBookmark = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Bookmarks</CardTitle>
                </CardHeader>
                <CardContent>
                    <RecentBookmarkTable />
                </CardContent>
            </Card>
        </>
    )
}

export default RecentBookmark

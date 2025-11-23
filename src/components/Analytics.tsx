'use client'

import { useMemo } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { BookmarkResponse, FolderResponse } from '@/types'

type Props = {
    bookmarks: BookmarkResponse[]
    folders: FolderResponse[]
}

const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
]

export function Analytics({ bookmarks, folders }: Props) {
    // Process data for Line Chart (Bookmarks over time)
    const lineChartData = useMemo(() => {
        const data: Record<string, number> = {}

        // Sort bookmarks by date
        const sortedBookmarks = [...bookmarks].sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
        )

        sortedBookmarks.forEach((bookmark) => {
            const date = new Date(bookmark.created_at).toLocaleDateString()
            data[date] = (data[date] || 0) + 1
        })

        return Object.entries(data).map(([date, count]) => ({
            date,
            count,
        }))
    }, [bookmarks])

    // Process data for Pie Chart (Bookmarks by folder)
    const pieChartData = useMemo(() => {
        const data: Record<string, number> = {}

        bookmarks.forEach((bookmark) => {
            const folderName =
                folders.find((f) => f.id === bookmark.folder_id)?.name ||
                'Uncategorized'
            data[folderName] = (data[folderName] || 0) + 1
        })

        return Object.entries(data).map(([name, value]) => ({
            name,
            value,
        }))
    }, [bookmarks, folders])

    if (bookmarks.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Line Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Bookmarks Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                    }}
                                    itemStyle={{
                                        color: 'hsl(var(--foreground))',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Bookmarks by Folder</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                    }}
                                    itemStyle={{
                                        color: 'hsl(var(--foreground))',
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

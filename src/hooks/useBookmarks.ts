import { useState, useEffect, useCallback } from 'react'
import { bookmarkService } from '@/services/bookmarkService'
import type {
    BookmarkResponse,
    CreateBookmarkRequest,
    UpdateBookmarkRequest,
} from '@/types'
import { toast } from 'sonner'

export const useBookmarks = (folderId?: string) => {
    const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchBookmarks = useCallback(async () => {
        setLoading(true)
        try {
            const data = await bookmarkService.getBookmarks(folderId)
            setBookmarks(data)
            setError(null)
        } catch (err) {
            console.error('Error fetching bookmarks:', err)
            setError(err as Error)
            toast.error('Failed to fetch bookmarks')
        } finally {
            setLoading(false)
        }
    }, [folderId])

    useEffect(() => {
        fetchBookmarks()
    }, [fetchBookmarks])

    const addBookmark = async (request: CreateBookmarkRequest) => {
        try {
            const newBookmark = await bookmarkService.createBookmark(request)
            setBookmarks((prev) => [newBookmark, ...prev])
            toast.success('Bookmark added successfully')
            return newBookmark
        } catch (err) {
            console.error('Error adding bookmark:', err)
            toast.error('Failed to add bookmark')
            throw err
        }
    }

    const updateBookmark = async (request: UpdateBookmarkRequest) => {
        try {
            const updatedBookmark =
                await bookmarkService.updateBookmark(request)
            setBookmarks((prev) =>
                prev.map((b) => (b.id === request.id ? updatedBookmark : b))
            )
            toast.success('Bookmark updated successfully')
            return updatedBookmark
        } catch (err) {
            console.error('Error updating bookmark:', err)
            toast.error('Failed to update bookmark')
            throw err
        }
    }

    const deleteBookmark = async (id: string) => {
        try {
            await bookmarkService.deleteBookmark(id)
            setBookmarks((prev) => prev.filter((b) => b.id !== id))
            toast.success('Bookmark deleted successfully')
        } catch (err) {
            console.error('Error deleting bookmark:', err)
            toast.error('Failed to delete bookmark')
            throw err
        }
    }

    return {
        bookmarks,
        loading,
        error,
        fetchBookmarks,
        addBookmark,
        updateBookmark,
        deleteBookmark,
    }
}

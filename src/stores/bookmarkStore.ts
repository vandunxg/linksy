import { create } from 'zustand'
import { toast } from 'sonner'
import type {
    BookmarkResponse,
    CreateBookmarkRequest,
    UpdateBookmarkRequest,
} from '@/types'
import { bookmarkService } from '@/services/bookmarkService'

interface BookmarkState {
    bookmarks: BookmarkResponse[]
    loading: boolean
    fetchBookmarks: (folderId?: string, force?: boolean) => Promise<void>
    addBookmark: (request: CreateBookmarkRequest) => Promise<BookmarkResponse>
    updateBookmark: (
        request: UpdateBookmarkRequest
    ) => Promise<BookmarkResponse>
    deleteBookmark: (id: string) => Promise<void>
}

export const useBookmarkStore = create<BookmarkState>()((set, get) => ({
    bookmarks: [],
    loading: false,

    fetchBookmarks: async (folderId?: string, force = false) => {
        // Simple caching: if we have bookmarks and not forced, don't fetch
        // Note: This is a basic cache. For folder-specific fetching, we might need a map or just refetch if folderId changes.
        // For now, assuming we want to load all bookmarks or refresh.
        // If folderId is provided, we probably want to filter or fetch specific ones.
        // Given the current requirement is just "optimize", let's check if we have data.

        // However, if folderId changes, we MUST fetch.
        // Let's keep it simple: if no folderId (all bookmarks) and we have data, skip.
        if (!force && !folderId && get().bookmarks.length > 0) {
            return
        }

        set({ loading: true })
        try {
            const data = await bookmarkService.getBookmarks(folderId)
            set({ bookmarks: data })
        } catch (err) {
            console.error('Error fetching bookmarks:', err)
            toast.error('Failed to fetch bookmarks')
        } finally {
            set({ loading: false })
        }
    },

    addBookmark: async (request: CreateBookmarkRequest) => {
        try {
            const newBookmark = await bookmarkService.createBookmark(request)
            set((state) => ({ bookmarks: [newBookmark, ...state.bookmarks] }))
            toast.success('Bookmark added successfully')
            return newBookmark
        } catch (err) {
            console.error('Error adding bookmark:', err)
            toast.error('Failed to add bookmark')
            throw err
        }
    },

    updateBookmark: async (request: UpdateBookmarkRequest) => {
        try {
            const updatedBookmark =
                await bookmarkService.updateBookmark(request)
            set((state) => ({
                bookmarks: state.bookmarks.map((b) =>
                    b.id === request.id ? updatedBookmark : b
                ),
            }))
            toast.success('Bookmark updated successfully')
            return updatedBookmark
        } catch (err) {
            console.error('Error updating bookmark:', err)
            toast.error('Failed to update bookmark')
            throw err
        }
    },

    deleteBookmark: async (id: string) => {
        try {
            await bookmarkService.deleteBookmark(id)
            set((state) => ({
                bookmarks: state.bookmarks.filter((b) => b.id !== id),
            }))
            toast.success('Bookmark deleted successfully')
        } catch (err) {
            console.error('Error deleting bookmark:', err)
            toast.error('Failed to delete bookmark')
            throw err
        }
    },
}))

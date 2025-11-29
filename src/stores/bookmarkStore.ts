import { create } from 'zustand'
import { toast } from 'sonner'
import type {
    BookmarkState,
    CreateBookmarkRequest,
    UpdateBookmarkRequest,
} from '@/types'
import { bookmarkService } from '@/services/bookmarkService'
import { BOOKMARK_ACTION } from '@/utils/Constant'

export const useBookmarkStore = create<BookmarkState>()((set, get) => ({
    bookmarks: [],
    publicBookmarks: [],
    loading: false,
    actionType: '',

    fetchPublicBookmarks: async (folderId?: string, force = false) => {
        if (!force && !folderId && get().bookmarks.length > 0) {
            return
        }
        set({ actionType: BOOKMARK_ACTION.FETCH_BOOKMARK })
        set({ loading: true })
        try {
            const data = await bookmarkService.getPublicBookmarks(folderId)
            set({ publicBookmarks: data })
        } catch (err) {
            console.error('Error fetching bookmarks:', err)
            toast.error('Failed to fetch bookmarks')
        } finally {
            set({ loading: false })
            set({ actionType: '' })
        }
    },

    fetchBookmarks: async (folderId?: string, force = false) => {
        if (!force && !folderId && get().bookmarks.length > 0) {
            return
        }
        set({ actionType: BOOKMARK_ACTION.FETCH_BOOKMARK })
        set({ loading: true })
        try {
            const data = await bookmarkService.getBookmarks(folderId)
            set({ bookmarks: data })
        } catch (err) {
            console.error('Error fetching bookmarks:', err)
            toast.error('Failed to fetch bookmarks')
        } finally {
            set({ loading: false })
            set({ actionType: '' })
        }
    },

    addBookmark: async (request: CreateBookmarkRequest) => {
        try {
            set({ actionType: BOOKMARK_ACTION.ADD_NEW_BOOKMARK })
            set({ loading: true })
            const newBookmark = await bookmarkService.createBookmark(request)
            set((state) => ({ bookmarks: [newBookmark, ...state.bookmarks] }))
            toast.success('Bookmark added successfully')
            return newBookmark
        } catch (err) {
            console.error('Error adding bookmark:', err)
            toast.error('Failed to add bookmark')
            throw err
        } finally {
            set({ actionType: '' })
            set({ loading: false })
        }
    },

    updateBookmark: async (request: UpdateBookmarkRequest) => {
        try {
            set({ loading: true })
            set({ actionType: BOOKMARK_ACTION.UPDATE_BOOKMARK })
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
        } finally {
            set({ actionType: '' })
            set({ loading: false })
        }
    },

    deleteBookmark: async (id: string) => {
        try {
            set({ loading: true })
            set({ actionType: BOOKMARK_ACTION.DELETE_BOOKMARK })
            await bookmarkService.deleteBookmark(id)
            const bookmarksAfterDeleted = get().bookmarks.filter(
                (item) => item.id != id
            )

            set({ bookmarks: [...bookmarksAfterDeleted] })

            toast.success('Bookmark deleted successfully')
        } catch (err) {
            console.error('Error deleting bookmark:', err)
            toast.error('Failed to delete bookmark')
            throw err
        } finally {
            set({ actionType: '' })
            set({ loading: false })
        }
    },
}))

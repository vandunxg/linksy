import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import type {
    BookmarkResponse,
    CreateBookmarkRequest,
    UpdateBookmarkRequest,
} from '@/types'

export const bookmarkService = {
    async createBookmark(
        request: CreateBookmarkRequest
    ): Promise<BookmarkResponse> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { data, error } = await supabase
            .from('bookmark')
            .insert([
                {
                    title: request.title,
                    url: request.url,
                    description: request.description,
                    folder_id: request.folder_id,
                    user_id: user.id,
                },
            ])
            .select('*')
            .single()

        if (error) throw error

        return data
    },

    async getBookmarks(folderId?: string): Promise<BookmarkResponse[]> {
        let query = supabase
            .from('bookmark')
            .select('*')
            .order('created_at', { ascending: false })

        if (folderId) query = query.eq('folder_id', folderId)

        const { data, error } = await query

        if (error) throw error

        return data
    },

    async updateBookmark(
        request: UpdateBookmarkRequest
    ): Promise<BookmarkResponse> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { data, error } = await supabase
            .from('bookmark')
            .update({
                title: request.title,
                url: request.url,
                description: request.description,
                folder_id: request.folder_id,
            })
            .eq('id', request.id)
            .eq('user_id', user.id) // đảm bảo đúng RLS của bạn
            .select('*')
            .single()

        if (error) throw error

        return data
    },

    async deleteBookmark(id: string): Promise<void> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { error } = await supabase
            .from('bookmark')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) throw error
    },
}

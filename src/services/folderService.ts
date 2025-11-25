import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import type {
    CreateFolderRequest,
    FolderResponse,
    UpdateFolderRequest,
} from '@/types'

export const folderService = {
    async createFolder(
        request: CreateFolderRequest
    ): Promise<FolderResponse[]> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')
        const { data, error } = await supabase
            .from('bookmark_folder')
            .insert([
                {
                    name: request.name,
                    description: request.description ?? '',
                    icon: request.icon ?? 'folder',
                    user_id: user.id,
                    is_public: true,
                    created_at: new Date(),
                },
            ])
            .select('*')

        if (error) throw error

        return data
    },

    async fetchPublicFolders(): Promise<FolderResponse[]> {
        const { data, error } = await supabase
            .from('bookmark_folder')
            .select('id, name, description, icon, created_at')
            .eq('is_public', true)
            .order('created_at', { ascending: false })

        if (error) throw error

        return data
    },

    async deleteFolderById(id: string) {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { error } = await supabase
            .from('bookmark_folder')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) throw error
    },

    async getRecentFolders(): Promise<FolderResponse[]> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { data, error } = await supabase
            .from('bookmark_folder')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)

        if (error) throw error

        return data || []
    },

    async updateFolder(request: UpdateFolderRequest): Promise<FolderResponse> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { data, error } = await supabase
            .from('bookmark_folder')
            .update({
                name: request.name,
                description: request.description ?? '',
                icon: request.icon ?? 'folder',
            })
            .eq('user_id', user.id)
            .eq('id', request.id)
            .select('*')

        if (error) throw error

        return data[0]
    },
}

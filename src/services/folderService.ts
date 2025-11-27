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
            .from('folders')
            .insert([
                {
                    name: request.name,
                    description: request.description ?? '',
                    icon: request.icon ?? 'folder',
                    user_id: user.id,
                    is_public: request.is_public ?? false,
                    created_at: new Date(),
                },
            ])
            .select('*')

        if (error) throw error

        return data
    },

    async fetchPublicFolders(): Promise<FolderResponse[]> {
        const { data, error } = await supabase
            .from('folders')
            .select('*')
            .eq('is_public', true)
            .order('created_at', { ascending: false })

        if (error) throw error

        return data
    },

    async fetchFolders(): Promise<FolderResponse[]> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { data, error } = await supabase
            .from('folders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        console.log(data)

        if (error) throw error

        return data
    },

    async deleteFolderById(id: string) {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { error } = await supabase
            .from('folders')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) throw error
    },

    async getRecentFolders(): Promise<FolderResponse[]> {
        const user = useAuthStore.getState().user
        if (!user) throw new Error('No user in store')

        const { data, error } = await supabase
            .from('folders')
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
            .from('folders')
            .update({
                name: request.name,
                description: request.description ?? '',
                icon: request.icon ?? 'folder',
                is_public: request.is_public,
            })
            .eq('user_id', user.id)
            .eq('id', request.id)
            .select('*')

        if (error) throw error

        return data[0]
    },
}

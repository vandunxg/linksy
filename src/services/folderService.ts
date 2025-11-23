import { supabase } from '@/lib/supabase'
import type {
    CreateFolderRequest,
    FolderResponse,
    UpdateFolderRequest,
} from '@/types'

export const folderService = {
    async createFolder(
        request: CreateFolderRequest
    ): Promise<FolderResponse[]> {
        const { data, error } = await supabase
            .from('bookmark_folder')
            .insert([
                {
                    name: request.name,
                    description: request.description ?? '',
                    icon: request.icon ?? 'folder',
                    user_id: null,
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
        const { error } = await supabase
            .from('bookmark_folder')
            .delete()
            .eq('id', id)

        if (error) throw error
    },

    async getRecentFolders(): Promise<FolderResponse[]> {
        const { data, error } = await supabase
            .from('bookmark_folder')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)

        if (error) throw error

        return data || []
    },

    async updateFolder(request: UpdateFolderRequest): Promise<FolderResponse> {
        const { data, error } = await supabase
            .from('bookmark_folder')
            .update({
                name: request.name,
                description: request.description ?? '',
                icon: request.icon ?? 'folder',
            })
            .eq('id', request.id)
            .select('*')

        if (error) throw error

        return data[0]
    },
}

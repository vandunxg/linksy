import { create } from 'zustand'

import { toast } from 'sonner'
import type { CreateFolderRequest, FolderState } from '@/types'
import { folderService } from '@/services/folderService'

export const useFolderStore = create<FolderState>()((set, get) => ({
    folders: [],
    recentFolders: [],
    loading: false,

    fetchAllFolder: async () => {
        set({ loading: true })

        try {
            const folders = await folderService.fetchPublicFolders()

            set({ folders })
        } catch (err) {
            console.log(err)

            toast.error(`Can't fetch folders.`)
        } finally {
            set({ loading: false })
        }
    },

    createNewFolder: async (request: CreateFolderRequest) => {
        set({ loading: true })

        try {
            const newFolder = await folderService.createFolder(request)

            set({ folders: [...get().folders, ...newFolder] })

            toast.success(`Created folder successfully.`)
        } catch (err) {
            console.log(err)

            toast.error(`Can't create folder.`)
        } finally {
            set({ loading: false })
        }
    },

    deleteFolder: async (id: string) => {
        set({ loading: true })

        try {
            await folderService.deleteFolderById(id)

            const newFolder = get().folders.filter((item) => item.id != id)

            set({ folders: [...newFolder] })

            toast.success(`Deleted folder successfully.`)
        } catch (err) {
            console.log(err)

            toast.error(`Can't delete folder.`)
        } finally {
            set({ loading: false })
        }
    },

    getRecentFolders: async () => {
        try {
            const recentFolders = await folderService.getRecentFolders()

            set({ recentFolders })
        } catch (err) {
            console.log(`[getRecentFolders] ${err}`)
        }
    },
}))

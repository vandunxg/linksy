import { create } from 'zustand'

import { toast } from 'sonner'
import type {
    CreateFolderRequest,
    FolderState,
    UpdateFolderRequest,
} from '@/types'
import { folderService } from '@/services/folderService'
import { FOLDER_ACTION } from '@/utils/Constant'

export const useFolderStore = create<FolderState>()((set, get) => ({
    folders: [],
    publicFolder: [],
    recentFolders: [],
    loading: false,
    reloadRecentFolder: false,
    actionType: '',

    fetchPublicFolders: async () => {
        console.log('[fetchPublicFolders]')

        if (get().folders.length > 0) return

        set({ actionType: FOLDER_ACTION.FETCH_FOLDER })
        set({ loading: true })

        try {
            const folders = await folderService.fetchPublicFolders()

            console.log('[fetchPublicFolders]', folders)

            set({ publicFolder: folders })
        } catch (err) {
            console.log(err)

            toast.error(`Can't fetch folders.`)
        } finally {
            set({ loading: false })
        }
    },

    updateFolder: async (request: UpdateFolderRequest) => {
        set({ actionType: FOLDER_ACTION.UPDATE_FOLDER })
        set({ loading: true })

        try {
            const newFolder = await folderService.updateFolder(request)

            set({
                folders: get().folders.map((item) =>
                    item.id === newFolder.id ? newFolder : item
                ),
            })

            toast.success('Update folder successfully')
        } catch (err) {
            console.log(err)

            toast.error(`Can't update folders.`)
        } finally {
            set({ loading: false })
        }
    },

    fetchAllFolder: async () => {
        console.log('[fetchAllFolder]')

        if (get().folders.length > 0) return

        set({ actionType: FOLDER_ACTION.FETCH_FOLDER })
        set({ loading: true })

        try {
            const folders = await folderService.fetchFolders()

            set({ folders })
        } catch (err) {
            console.log(err)

            toast.error(`Can't fetch folders.`)
        } finally {
            set({ loading: false })
        }
    },

    createNewFolder: async (request: CreateFolderRequest) => {
        set({ actionType: FOLDER_ACTION.ADD_NEW_FOLDER })
        set({ loading: true })

        try {
            const newFolder = await folderService.createFolder(request)

            set({ folders: [...get().folders, ...newFolder] })
            set({ reloadRecentFolder: true })

            toast.success(`Created folder successfully.`)
        } catch (err) {
            console.log(err)

            toast.error(`Can't create folder.`)
        } finally {
            set({ loading: false })
        }
    },

    deleteFolder: async (id: string) => {
        set({ actionType: FOLDER_ACTION.DELETE_FOLDER })
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
        if (get().recentFolders.length > 0 && !get().reloadRecentFolder) return

        set({ loading: true })
        try {
            const recentFolders = await folderService.getRecentFolders()

            set({ recentFolders })
            set({ reloadRecentFolder: false })
        } catch (err) {
            console.log(`[getRecentFolders] ${err}`)
        } finally {
            set({ loading: false })
        }
    },
}))

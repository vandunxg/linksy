import type { LoginRequest } from '@/services/authService'

export interface IUser {
    id?: string
    email?: string
    phone?: string
    avatar?: string
    name?: string
}

export interface AuthState {
    accessToken: string | null
    user: IUser | null
    loading: boolean
    login: (request: LoginRequest) => Promise<void>
    logout: () => void
}

export interface FolderResponse {
    id: string
    name: string
    description: string | undefined
    icon: string
    created_at: Date
}

export interface CreateFolderRequest {
    name: string
    description?: string
    icon: string
}

export interface UpdateFolderRequest {
    id: string | undefined
    name: string
    description?: string
    icon: string
}

export interface FolderState {
    folders: FolderResponse[]
    recentFolders: FolderResponse[]
    reloadRecentFolder: boolean
    actionType: string
    fetchAllFolder: () => void
    createNewFolder: (request: CreateFolderRequest) => void
    deleteFolder: (id: string) => void
    getRecentFolders: () => void
    updateFolder: (request: UpdateFolderRequest) => void
    loading: boolean
}

export interface BookmarkResponse {
    id: string
    title: string
    url: string
    description: string | null
    folder_id: string | null
    created_at: Date
}

export interface CreateBookmarkRequest {
    title: string
    url: string
    description?: string
    folder_id?: string
}

export interface UpdateBookmarkRequest {
    id: string
    title: string
    url: string
    description?: string
    folder_id?: string
}

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

export interface FolderState {
    folders: FolderResponse[]
    recentFolders: FolderResponse[]
    fetchAllFolder: () => void
    createNewFolder: (request: CreateFolderRequest) => void
    deleteFolder: (id: string) => void
    getRecentFolders: () => void
    loading: boolean
}

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
    is_public: boolean
}

export interface CreateFolderRequest {
    name: string
    description?: string
    icon: string
    is_public?: boolean
}

export interface UpdateFolderRequest {
    id: string | undefined
    name: string
    description?: string
    icon: string
    is_public?: boolean
}

export interface FolderState {
    folders: FolderResponse[]
    publicFolder: FolderResponse[]
    recentFolders: FolderResponse[]
    reloadRecentFolder: boolean
    actionType: string
    fetchAllFolder: () => void
    fetchPublicFolders: () => void
    createNewFolder: (request: CreateFolderRequest) => void
    deleteFolder: (id: string) => void
    getRecentFolders: () => void
    updateFolder: (request: UpdateFolderRequest) => void
    loading: boolean
}

export interface BookmarkState {
    actionType: string
    bookmarks: BookmarkResponse[]
    publicBookmarks: BookmarkResponse[]
    loading: boolean
    fetchBookmarks: (folderId?: string, force?: boolean) => Promise<void>
    fetchPublicBookmarks: (folderId?: string, force?: boolean) => Promise<void>
    addBookmark: (request: CreateBookmarkRequest) => Promise<BookmarkResponse>
    updateBookmark: (
        request: UpdateBookmarkRequest
    ) => Promise<BookmarkResponse>
    deleteBookmark: (id: string) => Promise<void>
}

export interface BookmarkResponse {
    id: string
    title: string
    url: string
    description: string | null
    folder_id: string | null
    created_at: Date
    is_public: boolean
}

export interface CreateBookmarkRequest {
    title: string
    url: string
    description?: string
    folder_id?: string
    is_public?: boolean
}

export interface UpdateBookmarkRequest {
    id: string
    title: string
    url: string
    description?: string
    folder_id?: string
    is_public?: boolean
}

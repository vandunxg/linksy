// src/constants/routes.ts

export const ROUTES = {
    AUTH: {
        ROOT: '/auth',
        LOGIN: '/auth/login',
    },
    ADMIN: {
        ROOT: '/admin',
        DASHBOARD: '/admin/dashboard',
        BOOKMARKS: '/admin/bookmarks',
        FOLDERS: '/admin/folders',
    },
    NOT_FOUND: '*',
} as const

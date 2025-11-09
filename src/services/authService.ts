import { supabase } from '@/lib/supabase'

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    user: null
    accessToken: string
    refreshToken: string
}

export const authService = {
    async login(request: LoginRequest) {
        const response = await supabase.auth.signInWithPassword(request)
        return response
    },

    async logout() {
        await supabase.auth.signOut()
    },
}

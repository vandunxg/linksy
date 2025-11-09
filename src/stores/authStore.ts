import { create } from 'zustand'
import { authService, type LoginRequest } from '@/services/authService'
import type { AuthState } from '@/types'

import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { AuthApiError } from '@supabase/supabase-js'

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            user: null,
            loading: false,

            login: async (request: LoginRequest) => {
                set({ loading: true })

                try {
                    const { data, error } = await authService.login(request)

                    if (error) throw error

                    set({
                        accessToken: data.session?.access_token ?? null,
                        user: {
                            id: data.user?.id ?? '',
                            email: data.user?.email ?? '',
                            phone: data.user?.phone ?? '',
                        },
                    })

                    toast.success('Login successfully.')
                } catch (err) {
                    console.log(`Login failed: ${err}`)

                    if (err instanceof AuthApiError) {
                        toast.error(err.message)
                    } else {
                        toast.error('Login failed.')
                    }

                    set({ user: null, accessToken: null })
                } finally {
                    set({ loading: false })
                }
            },

            logout: async () => {
                try {
                    await authService.logout()

                    console.log('logout successfully')
                } catch (err) {
                    console.log(`logout failed: ${err}`)
                }
                set({ accessToken: null, user: null })
            },
        }),
        { name: 'auth-storage' }
    )
)

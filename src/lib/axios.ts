import axios from 'axios'
import type {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com'

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// ✅ Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// ✅ Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status
            if (status === 401) {
                console.warn('Unauthorized — redirecting to login...')
                localStorage.removeItem('access_token')
                window.location.href = '/login'
            } else if (status >= 500) {
                console.error('Server error:', error.response.data)
            }
        }
        return Promise.reject(error)
    }
)

export default api

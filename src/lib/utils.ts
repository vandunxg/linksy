import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getWebsiteLogo(url: string, size: number = 64): string {
    try {
        const domain = new URL(url).hostname
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
    } catch {
        return '/default-favicon.png' // fallback nếu URL lỗi
    }
}

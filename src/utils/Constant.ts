import {
    Airplay,
    CodeXml,
    Book,
    Folder,
    Cloud,
    Database,
    Image,
    Music,
    Globe,
    Settings,
    Terminal,
    Cpu,
    FileCode,
} from 'lucide-react'

export const FOLDER_ICON = [
    { id: 'code', icon: CodeXml, name: 'Code' },
    { id: 'media', icon: Image, name: 'Media' },
    { id: 'music', icon: Music, name: 'Music' },
    { id: 'cloud', icon: Cloud, name: 'Cloud' },
    { id: 'database', icon: Database, name: 'Database' },
    { id: 'globe', icon: Globe, name: 'Web' },
    { id: 'terminal', icon: Terminal, name: 'Terminal' },
    { id: 'cpu', icon: Cpu, name: 'System' },
    { id: 'folder', icon: Folder, name: 'Folder' },
    { id: 'book', icon: Book, name: 'Docs' },
    { id: 'settings', icon: Settings, name: 'Settings' },
    { id: 'display', icon: Airplay, name: 'Display' },
    { id: 'file', icon: FileCode, name: 'File' },
]

export const ICON_MAP: Record<string, React.ElementType> = {
    code: CodeXml,
    media: Image,
    music: Music,
    cloud: Cloud,
    database: Database,
    globe: Globe,
    terminal: Terminal,
    cpu: Cpu,
    folder: Folder,
    book: Book,
    settings: Settings,
    display: Airplay,
    file: FileCode,
}

export const FOLDER_ACTION = {
    ADD_NEW_FOLDER: 'add_new_folder',
    UPDATE_FOLDER: 'update_folder',
    DELETE_FOLDER: 'delete_folder',
    FETCH_FOLDER: 'fetch_folder',
}

export const BOOKMARK_ACTION = {
    ADD_NEW_BOOKMARK: 'add_new_bookmark',
    UPDATE_BOOKMARK: 'update_bookmark',
    DELETE_BOOKMARK: 'delete_bookmark',
    FETCH_BOOKMARK: 'fetch_bookmark',
}

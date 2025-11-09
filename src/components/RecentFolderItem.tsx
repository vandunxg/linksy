import type { FolderResponse } from '@/types'
import { ICON_MAP } from '@/utils/Constant'

type Props = {
    folder: FolderResponse
}

const RecentFolderItem = ({ folder }: Props) => {
    const FolderIcon = ICON_MAP[folder?.icon]

    return (
        <div className="hover:bg-muted/70 flex items-center gap-3 rounded-lg p-2 transition-colors">
            {/* Icon */}
            <div className="bg-muted flex items-center justify-center rounded-lg p-2">
                <FolderIcon size={18} className="text-muted-foreground" />
            </div>

            {/* Text content */}
            <div className="flex flex-col">
                <p
                    title={folder?.name}
                    className="text-accent-foreground line-clamp-1 text-lg font-medium"
                >
                    {folder?.name && folder.name.length > 15
                        ? folder.name.slice(0, 15) + '…'
                        : folder?.name || 'Untitled Folder'}
                </p>
                <p className="text-muted-foreground text-xs">245 bookmarks</p>
            </div>
        </div>
    )
}

export default RecentFolderItem

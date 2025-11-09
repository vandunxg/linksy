import { Folder } from 'lucide-react'
import React from 'react'

const RecentFolderList = () => {
    return (
        <div className="space-y-3">
            <div className="hover:bg-muted/70 flex items-center gap-3 rounded-lg p-2 transition-colors">
                {/* Icon */}
                <div className="bg-muted flex items-center justify-center rounded-lg p-2">
                    <Folder size={18} className="text-muted-foreground" />
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                    <p className="text-sm leading-none font-medium">
                        Development
                    </p>
                    <p className="text-muted-foreground text-xs">
                        245 bookmarks
                    </p>
                </div>
            </div>
            <div className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-2 transition-colors">
                {/* Icon */}
                <div className="bg-muted flex items-center justify-center rounded-lg p-2">
                    <Folder size={18} className="text-muted-foreground" />
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                    <p className="text-sm leading-none font-medium">
                        Development
                    </p>
                    <p className="text-muted-foreground text-xs">
                        245 bookmarks
                    </p>
                </div>
            </div>
            <div className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-2 transition-colors">
                {/* Icon */}
                <div className="bg-muted flex items-center justify-center rounded-lg p-2">
                    <Folder size={18} className="text-muted-foreground" />
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                    <p className="text-sm leading-none font-medium">
                        Development
                    </p>
                    <p className="text-muted-foreground text-xs">
                        245 bookmarks
                    </p>
                </div>
            </div>
            <div className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-2 transition-colors">
                {/* Icon */}
                <div className="bg-muted flex items-center justify-center rounded-lg p-2">
                    <Folder size={18} className="text-muted-foreground" />
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                    <p className="text-sm leading-none font-medium">
                        Development
                    </p>
                    <p className="text-muted-foreground text-xs">
                        245 bookmarks
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RecentFolderList

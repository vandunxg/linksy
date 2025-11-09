import { AddFolderDialog } from '@/components/AddFolderDialog'
import { FolderCard } from '@/components/FolderCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useFolderStore } from '@/stores/folderStore'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FolderPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const { folders, fetchAllFolder, loading } = useFolderStore()

    useEffect(() => {
        fetchAllFolder()
    }, [fetchAllFolder])

    return (
        <>
            <div className="space-y-6 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">All Folders</h1>
                        <p className="text-muted-foreground text-sm">
                            1200 bookmarks saved
                        </p>
                    </div>
                    <div>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus />
                            Add folder
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <motion.div
                        className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnimatePresence>
                            {folders.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <FolderCard data={item} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
            <AddFolderDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            />
        </>
    )
}

export default FolderPage

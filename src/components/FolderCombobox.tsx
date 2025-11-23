import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useFolderStore } from '@/stores/folderStore'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { ICON_MAP } from '@/utils/Constant'

type Props = {
    open: boolean
    setOpen: (b: boolean) => void
}

const FolderCombobox = ({ open, setOpen }: Props) => {
    const { folders } = useFolderStore()

    const selectedFolder = folders.find((item) => item.id === '')

    const SelectedFolderIcon =
        selectedFolder && ICON_MAP[selectedFolder.icon]
            ? ICON_MAP[selectedFolder.icon]
            : ICON_MAP['folder']

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                >
                    <div className="flex items-center gap-2">
                        {selectedFolder ? (
                            <>
                                <SelectedFolderIcon className="text-primary h-5 w-5" />
                                <span>{selectedFolder.name}</span>
                            </>
                        ) : (
                            <span>Select folder…</span>
                        )}
                    </div>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[320px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search folder..." />
                    <CommandList className="max-h-[250px] overflow-y-auto">
                        {folders.map((item) => {
                            const IconComponent =
                                ICON_MAP[item.icon] ?? ICON_MAP['folder']

                            return (
                                <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={() => {
                                        setOpen(false)
                                    }}
                                    className="flex cursor-pointer items-center gap-2 py-2"
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                    >
                                        <IconComponent className="text-muted-foreground h-5 w-5" />
                                    </motion.div>
                                    <span>{item.name}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default FolderCombobox

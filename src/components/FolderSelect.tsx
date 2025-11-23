import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import type { FolderResponse } from '@/types'

type FolderSelectProps = {
    folders: FolderResponse[]
    value?: string
    onValueChange: (value: string) => void
    label?: string
    placeholder?: string
}

export function FolderSelect({
    folders,
    value,
    onValueChange,
    label = 'Folder',
    placeholder = 'Select folder',
}: FolderSelectProps) {
    const [open, setOpen] = useState(false)

    return (
        <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                'w-full justify-between',
                                !value && 'text-muted-foreground'
                            )}
                        >
                            {value
                                ? folders.find((folder) => folder.id === value)
                                      ?.name
                                : placeholder}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                        <CommandInput placeholder="Search folder..." />
                        <CommandList>
                            <CommandEmpty>No folder found.</CommandEmpty>
                            <CommandGroup>
                                {folders.map((folder) => (
                                    <CommandItem
                                        value={folder.name}
                                        key={folder.id}
                                        onSelect={() => {
                                            onValueChange(folder.id)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                folder.id === value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {folder.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )
}

import { useState, type Dispatch, type SetStateAction, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from '@/components/ui/command'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFolderStore } from '@/stores/folderStore'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import type { BookmarkResponse, CreateBookmarkRequest } from '@/types'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// 🧩 Schema
const bookmarkSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    url: z.string().url(),
    folderId: z.string().optional(),
    description: z.string().optional(),
})

type BookmarkFormType = z.infer<typeof bookmarkSchema>

type Props = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    onAddBookmark: (request: CreateBookmarkRequest) => Promise<BookmarkResponse>
    defaultFolderId?: string
}

export function AddBookmarkDialog({
    isOpen,
    setIsOpen,
    onAddBookmark,
    defaultFolderId,
}: Props) {
    const { folders, fetchAllFolder } = useFolderStore()
    const [openFolderSelect, setOpenFolderSelect] = useState(false)

    useEffect(() => {
        if (isOpen) {
            fetchAllFolder()
        }
    }, [isOpen, fetchAllFolder])

    const form = useForm<BookmarkFormType>({
        resolver: zodResolver(bookmarkSchema),
        defaultValues: {
            name: '',
            description: '',
            url: '',
            folderId: defaultFolderId || '',
        },
    })

    // Update form when defaultFolderId changes or dialog opens
    useEffect(() => {
        if (isOpen && defaultFolderId) {
            form.setValue('folderId', defaultFolderId)
        } else if (isOpen && !defaultFolderId) {
            form.setValue('folderId', '')
        }
    }, [isOpen, defaultFolderId, form])

    const onSubmit = async (values: BookmarkFormType) => {
        try {
            await onAddBookmark({
                title: values.name,
                url: values.url,
                description: values.description,
                folder_id: values.folderId || undefined,
            })
            setIsOpen(false)
            form.reset()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <DialogHeader>
                    <DialogTitle>Add new bookmark</DialogTitle>
                    <DialogDescription>
                        Create your new bookmark.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bookmark name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Facebook"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bookmark url</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://www.facebook.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="folderId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Folder</FormLabel>
                                    <Popover
                                        open={openFolderSelect}
                                        onOpenChange={setOpenFolderSelect}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        'w-full justify-between',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value
                                                        ? folders.find(
                                                              (folder) =>
                                                                  folder.id ===
                                                                  field.value
                                                          )?.name
                                                        : 'Select folder'}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search folder..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No folder found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {folders.map(
                                                            (folder) => (
                                                                <CommandItem
                                                                    value={
                                                                        folder.name
                                                                    }
                                                                    key={
                                                                        folder.id
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            'folderId',
                                                                            folder.id
                                                                        )
                                                                        setOpenFolderSelect(
                                                                            false
                                                                        )
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            folder.id ===
                                                                                field.value
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0'
                                                                        )}
                                                                    />
                                                                    {
                                                                        folder.name
                                                                    }
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bookmark description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Description..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">Add new bookmark</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
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
import { FolderSelect } from '@/components/FolderSelect'

// ---------------- Schema ----------------
const bookmarkSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    url: z.string().url(),
    folderId: z.string().nullable().optional(),
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

    // Load folders when dialog opens
    useEffect(() => {
        if (isOpen) fetchAllFolder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    const form = useForm<BookmarkFormType>({
        resolver: zodResolver(bookmarkSchema),
        defaultValues: {
            name: '',
            description: '',
            url: '',
            folderId: defaultFolderId ?? null,
        },
    })

    // Update form value when defaultFolderId changes
    useEffect(() => {
        if (isOpen) {
            form.setValue('folderId', defaultFolderId ?? null)
        }
    }, [isOpen, defaultFolderId, form])

    const onSubmit = async (values: BookmarkFormType) => {
        try {
            await onAddBookmark({
                title: values.name,
                url: values.url,
                description: values.description,
                folder_id: values.folderId ?? undefined,
            })

            form.reset()
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add new bookmark</DialogTitle>
                    <DialogDescription>
                        Add a new bookmark to your collection.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Name */}
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

                        {/* URL */}
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

                        {/* Folder */}
                        <FormField
                            control={form.control}
                            name="folderId"
                            render={({ field }) => (
                                <FormItem>
                                    <FolderSelect
                                        folders={folders}
                                        value={field.value || undefined}
                                        onValueChange={field.onChange}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
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
                        <DialogFooter className="mt-3 flex gap-3">
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

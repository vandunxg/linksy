import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useBookmarkStore } from '@/stores/bookmarkStore'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import type { BookmarkResponse } from '@/types'
import { FolderSelect } from '@/components/FolderSelect'

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
    bookmark: BookmarkResponse
}

export function EditBookmarkDialog({ isOpen, setIsOpen, bookmark }: Props) {
    const { folders, fetchAllFolder } = useFolderStore()
    const { updateBookmark } = useBookmarkStore()

    useEffect(() => {
        if (isOpen) {
            fetchAllFolder()
        }
    }, [isOpen, fetchAllFolder])

    const form = useForm<BookmarkFormType>({
        resolver: zodResolver(bookmarkSchema),
        defaultValues: {
            name: bookmark.title,
            description: bookmark.description || '',
            url: bookmark.url,
            folderId: bookmark.folder_id || '',
        },
    })

    // Update form values when bookmark changes
    useEffect(() => {
        if (bookmark) {
            form.reset({
                name: bookmark.title,
                description: bookmark.description || '',
                url: bookmark.url,
                folderId: bookmark.folder_id || '',
            })
        }
    }, [bookmark, form])

    const onSubmit = async (values: BookmarkFormType) => {
        try {
            await updateBookmark({
                id: bookmark.id,
                title: values.name,
                url: values.url,
                description: values.description,
                folder_id: values.folderId || undefined,
            })
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <DialogHeader>
                    <DialogTitle>Edit bookmark</DialogTitle>
                    <DialogDescription>
                        Update your bookmark details.
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
                                <FolderSelect
                                    folders={folders}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
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
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

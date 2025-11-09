import { motion } from 'framer-motion'
import { type Dispatch, type SetStateAction } from 'react'
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
import { FOLDER_ICON } from '@/utils/Constant'
import { useFolderStore } from '@/stores/folderStore'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

// 🧩 Schema
const folderSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    description: z.string().optional(),
    icon: z.string().min(1, {
        message: 'Please select an icon.',
    }),
})

type FolderFormType = z.infer<typeof folderSchema>

type Props = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function AddFolderDialog({ isOpen, setIsOpen }: Props) {
    const form = useForm<FolderFormType>({
        resolver: zodResolver(folderSchema),
        defaultValues: {
            name: '',
            description: '',
            icon: 'folder',
        },
    })

    const { createNewFolder } = useFolderStore()

    const onSubmit = async (values: FolderFormType) => {
        await createNewFolder({
            name: values.name,
            description: values.description,
            icon: values.icon,
        })

        setIsOpen(false)
        form.reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <DialogHeader>
                    <DialogTitle>Add new folder</DialogTitle>
                    <DialogDescription>
                        Create your new folder.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Folder name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Folder name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Development"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Folder description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Folder description</FormLabel>
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

                        {/* Folder icon */}
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
                                            {FOLDER_ICON.map((item) => {
                                                const isActive =
                                                    field.value === item.id
                                                return (
                                                    <motion.button
                                                        type="button"
                                                        key={item.id}
                                                        whileHover={{
                                                            scale: 1.08,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.92,
                                                        }}
                                                        onClick={() =>
                                                            field.onChange(
                                                                item.id
                                                            )
                                                        }
                                                        className={`flex items-center justify-center rounded-md border p-3 transition-all ${
                                                            isActive
                                                                ? 'bg-primary text-primary-foreground ring-primary/40 ring-2'
                                                                : 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                        }`}
                                                    >
                                                        <item.icon className="h-5 w-5" />
                                                    </motion.button>
                                                )
                                            })}
                                        </div>
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
                            <Button type="submit">Add new folder</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

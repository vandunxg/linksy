import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type JSX, type SVGProps, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/utils/routes'

const GoogleIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
    </svg>
)

const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(50),
    remember: z.boolean().optional(),
})

const Logo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
        fill="currentColor"
        height="48"
        viewBox="0 0 40 48"
        width="40"
        {...props}
    >
        <clipPath id="a">
            <path d="m0 0h40v48h-40z" />
        </clipPath>
        <g clipPath="url(#a)">
            <path d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
            <path d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
            <path d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
            <path d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
            <path d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
            <path d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
        </g>
    </svg>
)

export default function LoginPage() {
    const { login, loading, accessToken } = useAuthStore()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
    })

    useEffect(() => {
        if (accessToken) navigate(ROUTES.ADMIN.ROOT)
    }, [accessToken, navigate])

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        await login({
            email: values.email,
            password: values.password,
        })
        navigate(ROUTES.ADMIN.ROOT)
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

    return (
        <div className="bg-accent flex min-h-screen items-center justify-center">
            <Card className="mx-4 w-full max-w-md pb-0">
                <CardHeader className="mt-4 mb-2 space-y-1 text-center">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Sign in to Linksy
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            Welcome back! Please enter your details.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* EMAIL FIELD */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="ephraim@blocks.so"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* PASSWORD FIELD */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <FormLabel>Password</FormLabel>
                                            <a
                                                href="#"
                                                className="text-primary text-sm hover:underline"
                                            >
                                                Reset password
                                            </a>
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    className="pe-9"
                                                    placeholder="Enter your password"
                                                    type={
                                                        isPasswordVisible
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={
                                                        togglePasswordVisibility
                                                    }
                                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    aria-label={
                                                        isPasswordVisible
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                >
                                                    {isPasswordVisible ? (
                                                        <EyeOffIcon
                                                            size={16}
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <EyeIcon
                                                            size={16}
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* REMEMBER ME */}
                            <FormField
                                control={form.control}
                                name="remember"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                id="remember"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel
                                            htmlFor="remember"
                                            className="text-sm leading-none font-normal"
                                        >
                                            Remember me
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />

                            {/* BUTTONS */}
                            <div className="space-y-2">
                                <Button
                                    className="w-full"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Sign in...' : 'Sign in'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center gap-2"
                                >
                                    <GoogleIcon className="h-4 w-4" />
                                    Sign in with Google
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center border-t py-4!">
                    <p className="text-muted-foreground text-center text-sm">
                        New to Acme?{' '}
                        <a href="#" className="text-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

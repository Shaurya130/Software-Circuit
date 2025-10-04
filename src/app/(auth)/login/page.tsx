"use client";

import React from "react";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = React.useState(false);
    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    return (
        <button
            className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 shadow hover:scale-105 transition-all"
            onClick={() => setIsDark(d => !d)}
            aria-label="Toggle dark mode"
        >
            {isDark ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};


export default function Login() {
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        if (!email || !password) {
            setError(() => "Please fill out all fields");
            return;
        }
        setIsLoading(() => true);
        setError(() => "");
        const loginResponse = await login(email.toString(), password.toString());
        if (loginResponse.error) {
            setError(() => loginResponse.error!.message);
        }
        setIsLoading(() => false);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-indigo-100 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-black relative">
            <DarkModeToggle />
            <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/90 dark:bg-zinc-900/90 shadow-2xl p-8 flex flex-col items-center">
                <div className="mb-6 flex flex-col items-center">
                    <IconBrandGoogle className="h-10 w-10 text-cyan-500 mb-2" />
                    <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Login to Software Circuit</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Welcome back! Enter your credentials to continue.<br />
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-orange-500 hover:underline font-semibold">Register</Link>
                    </p>
                </div>
                {error && (
                    <p className="mb-4 w-full text-center text-sm font-semibold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg py-2 px-3">{error}</p>
                )}
                <form className="w-full" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            className="text-black dark:text-white"
                            id="email"
                            name="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-6">
                        <Label htmlFor="password">Password</Label>
                        <Input className="text-black dark:text-white" id="password" name="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>
                    <button
                        className="group/btn relative block h-12 w-full rounded-lg bg-gradient-to-br from-cyan-600 to-indigo-500 font-bold text-white shadow-lg hover:scale-[1.03] transition-transform duration-150"
                        type="submit"
                        disabled={isLoading}
                    >
                        Log in &rarr;
                        <BottomGradient />
                    </button>
                    <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                    <div className="flex flex-col space-y-4">
                        <button
                            className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 font-bold text-black dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                            type="button"
                            disabled={isLoading}
                        >
                            <IconBrandGoogle className="h-5 w-5 text-cyan-500" />
                            <span className="text-base">Login with Google</span>
                            <BottomGradient />
                        </button>
                        <button
                            className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 font-bold text-black dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                            type="button"
                            disabled={isLoading}
                        >
                            <IconBrandGithub className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-base">Login with GitHub</span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
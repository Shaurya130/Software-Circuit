"use client";

import React from "react";
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 relative">
            <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900/80 backdrop-blur shadow-xl p-8">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 mb-4">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-zinc-400 text-sm">
                        Sign in to your Software Circuit account<br />
                        <span className="text-zinc-500">New here? </span>
                        <Link href="/register" className="text-orange-500 hover:text-orange-400 font-medium">Create an account</Link>
                    </p>
                </div>
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-sm text-red-400 text-center">{error}</p>
                    </div>
                )}
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <LabelInputContainer>
                        <Label htmlFor="email" className="text-zinc-200">Email Address</Label>
                        <Input
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500/20"
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            type="email"
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="password" className="text-zinc-200">Password</Label>
                        <Input 
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500/20" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            type="password" 
                        />
                    </LabelInputContainer>
                    <button
                        className="group/btn relative w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                        <BottomGradient />
                    </button>
                    <div className="my-6 flex items-center">
                        <div className="flex-1 h-px bg-zinc-700"></div>
                        <span className="px-3 text-sm text-zinc-500">or continue with</span>
                        <div className="flex-1 h-px bg-zinc-700"></div>
                    </div>
                    <div className="space-y-3">
                        <button
                            className="group/btn relative flex items-center justify-center w-full h-11 px-4 border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg transition-colors duration-200"
                            type="button"
                            disabled={isLoading}
                        >
                            <IconBrandGoogle className="h-5 w-5 mr-3" />
                            <span>Continue with Google</span>
                            <BottomGradient />
                        </button>
                        <button
                            className="group/btn relative flex items-center justify-center w-full h-11 px-4 border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg transition-colors duration-200"
                            type="button"
                            disabled={isLoading}
                        >
                            <IconBrandGithub className="h-5 w-5 mr-3" />
                            <span>Continue with GitHub</span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
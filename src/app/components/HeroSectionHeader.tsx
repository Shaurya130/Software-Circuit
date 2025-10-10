"use client";

import {IconCloud} from "@/components/magicui/icon-cloud";
import {Particles} from "@/components/magicui/particles";
import {ShimmerButton} from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const techIcons = [
    { name: "typescript", color: "#3178C6" },
    { name: "javascript", color: "#F7DF1E" },
    { name: "react", color: "#61DAFB" },
    { name: "nextdotjs", color: "#000000" },
    { name: "nodedotjs", color: "#339933" },
    { name: "express", color: "#000000" },
    { name: "postgresql", color: "#4169E1" },
    { name: "firebase", color: "#FFCA28" },
    { name: "docker", color: "#2496ED" },
    { name: "amazonaws", color: "#FF9900" },
    { name: "vercel", color: "#000000" },
    { name: "git", color: "#F05032" },
    { name: "github", color: "#181717" },
    { name: "html5", color: "#E34F26" },
    { name: "css3", color: "#1572B6" },
    { name: "java", color: "#ED8B00" },
    { name: "figma", color: "#F24E1E" },
    { name: "visualstudiocode", color: "#007ACC" },
];

const HeroSectionHeader = () => {
    const { session } = useAuthStore();

    return (
        <div className="container mx-auto px-4">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-6xl font-bold leading-tight tracking-tighter text-transparent">
                            Software-Circuit
                        </h1>
                        <p className="text-center text-xl font-medium leading-relaxed tracking-normal text-gray-300 max-w-2xl mx-auto">
                            Ask questions, share knowledge, and collaborate with developers
                            worldwide. Join our community and enhance your coding skills!
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            {session ? (
                                <Link href="/questions/ask">
                                    <ShimmerButton className="shadow-2xl">
                                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
                                            Ask a question
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <ShimmerButton className="shadow-2xl">
                                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                                Sign up
                                            </span>
                                        </ShimmerButton>
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="relative rounded-full border border-neutral-200 px-8 py-3 font-medium text-black dark:border-white/[0.2] dark:text-white"
                                    >
                                        <span>Login</span>
                                        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative w-full h-96 max-w-lg flex items-center justify-center">
                        <div className="w-80 h-80 relative">
                            <IconCloud 
                                images={techIcons.map(tech => `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.name}.svg`)}
                            />
                            {/* Fallback visible grid if IconCloud doesn't render */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-90">
                                <div className="grid grid-cols-6 gap-5">
                                    {techIcons.slice(0, 18).map((tech, index) => (
                                        <div
                                            key={tech.name}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse"
                                            style={{ 
                                                backgroundColor: tech.color,
                                                animationDelay: `${index * 0.1}s`,
                                                animationDuration: '2s'
                                            }}
                                        >
                                            <Image
                                                src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.name}.svg`}
                                                alt={tech.name}
                                                width={20}
                                                height={20}
                                                className="w-5 h-5"
                                                style={{ 
                                                    filter: tech.color === '#000000' || tech.color === '#181717' 
                                                        ? 'invert(1)' 
                                                        : 'brightness(0) invert(1)'
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSectionHeader;
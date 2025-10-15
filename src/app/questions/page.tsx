"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

// Force dynamic rendering to prevent prerender errors with search params
export const dynamic = 'force-dynamic';

const Search = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const searchValue = searchParams.get("search") || "";
        setSearch(searchValue);
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("search", search);
        router.push(`${pathname}?${newSearchParams}`);
    };

    return (
        <div className="w-full pt-12 pb-8 px-6 bg-gradient-to-br from-black to-zinc-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10 text-neutral-100 tracking-tight">
                    Search Questions
                </h1>
                <form className="flex w-full flex-row gap-6 max-w-3xl mx-auto" onSubmit={handleSearch}>
                    <Input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 bg-zinc-800/50 backdrop-blur-sm border-zinc-700 text-white placeholder-zinc-400 h-12 text-lg rounded-xl"
                    />
                    <button className="shrink-0 rounded-xl bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600 transition-colors shadow-lg">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Search;
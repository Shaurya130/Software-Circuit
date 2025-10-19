"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
    className,
    total,
    limit,
}: {
    className?: string;
    limit: number;
    total: number;
}) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const totalPages = Math.ceil(total / limit);
    const router = useRouter();
    const pathnanme = usePathname();

    const prev = () => {
        if (page <= "1") return;
        const pageNumber = parseInt(page);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", `${pageNumber - 1}`);
        router.push(`${pathnanme}?${newSearchParams}`);
    };

    const next = () => {
        if (page >= `${totalPages}`) return;
        const pageNumber = parseInt(page);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", `${pageNumber + 1}`);
        router.push(`${pathnanme}?${newSearchParams}`);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <button
                className={`${className} rounded-lg bg-white/10 px-3 sm:px-4 py-2 text-sm font-medium duration-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]`}
                onClick={prev}
                disabled={page <= "1"}
            >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
            </button>
            <span className="text-sm text-gray-400 order-first sm:order-none py-1">
                Page {page} of {totalPages || "1"}
            </span>
            <button
                className={`${className} rounded-lg bg-white/10 px-3 sm:px-4 py-2 text-sm font-medium duration-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]`}
                onClick={next}
                disabled={page >= `${totalPages}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
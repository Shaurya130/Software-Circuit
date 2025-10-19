"use client";

import React from "react";
import { BorderBeam } from "./magicui/border-beam";
import Link from "next/link";
import { Models } from "appwrite";
import slugify from "@/utils/slugify";
import { avatars } from "@/models/client/config";
import convertDateToRelativeTime from "@/utils/relativeTime";

const QuestionCard = ({ ques }: { ques: Models.Document }) => {
    const [height, setHeight] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            className="relative flex flex-col gap-3 sm:gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-3 sm:p-4 duration-200 hover:bg-white/10 sm:flex-row"
        >
            <BorderBeam size={height} duration={12} delay={9} />
            <div className="relative shrink-0 text-xs sm:text-sm flex sm:flex-col gap-4 sm:gap-0 sm:text-right">
                <p className="flex items-center gap-1 sm:block">
                    <span className="font-semibold">{ques.totalVotes}</span>
                    <span className="text-gray-400">votes</span>
                </p>
                <p className="flex items-center gap-1 sm:block">
                    <span className="font-semibold">{ques.totalAnswers}</span>
                    <span className="text-gray-400">answers</span>
                </p>
            </div>
            <div className="relative w-full">
                <Link
                    href={`/questions/${ques.$id}/${slugify(ques.title)}`}
                    className="text-orange-500 duration-200 hover:text-orange-600"
                >
                    <h2 className="text-lg sm:text-xl font-medium leading-tight">{ques.title}</h2>
                </Link>
                <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex flex-wrap gap-2">
                        {ques.tags.map((tag: string) => (
                            <Link
                                key={tag}
                                href={`/questions?tag=${tag}`}
                                className="inline-block rounded-md bg-white/10 px-2 py-0.5 text-xs duration-200 hover:bg-white/20"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 pt-2 border-t border-white/10 sm:border-0 sm:pt-0">
                        <div className="flex items-center gap-2">
                            <picture>
                                <img
                                    src={avatars.getInitials(ques.author.name, 24, 24)}
                                    alt={ques.author.name}
                                    className="rounded-lg w-6 h-6"
                                />
                            </picture>
                            <Link
                                href={`/users/${ques.author.$id}/${slugify(ques.author.name)}`}
                                className="text-orange-500 hover:text-orange-600 font-medium"
                            >
                                {ques.author.name}
                            </Link>
                            <span className="text-gray-400 text-xs">({ques.author.reputation})</span>
                        </div>
                        <span className="text-gray-400 text-xs">asked {convertDateToRelativeTime(new Date(ques.$createdAt))}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
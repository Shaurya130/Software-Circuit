"use client";

import QuestionForm from "@/components/QuestionForm";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";

const AskQuestionPage = () => {
    const { user } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Please log in to ask a question.</div>
            </div>
        );
    }

    return (
        <div className="w-full pt-12 pb-16 px-6 bg-gradient-to-br from-black to-zinc-900 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-neutral-100 tracking-tight">
                    Ask a Question
                </h1>
                <div className="bg-black/60 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-zinc-700/50">
                    <QuestionForm />
                </div>
            </div>
        </div>
    );
};

export default AskQuestionPage;
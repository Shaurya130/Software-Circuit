import Pagination from "@/components/Pagination";
import QuestionCard from "@/components/QuestionCard";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
    searchParams,
}: {
    searchParams: { page?: string; tag?: string };
}) => {
    searchParams.page ||= "1";

    const queries = [
        Query.orderDesc("$createdAt"),
        Query.offset((+searchParams.page - 1) * 25),
        Query.limit(25),
    ];

    // Add tag filter if provided
    if (searchParams.tag) {
        queries.push(Query.search("tags", searchParams.tag));
    }

    const questions = await databases.listDocuments(db, questionCollection, queries);

    questions.documents = await Promise.all(
        questions.documents.map(async ques => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                },
            };
        })
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">All Questions</h1>
                <p className="text-gray-400 text-sm sm:text-base">{questions.total} questions</p>
            </div>
            <div className="mb-6 sm:mb-8 max-w-5xl space-y-4 sm:space-y-6">
                {questions.documents.map(ques => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
            </div>
            <div className="flex justify-center">
                <Pagination total={questions.total} limit={25} />
            </div>
        </div>
    );
};

export default Page;
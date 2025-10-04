import Answers from "@/components/Answers";
import Comments from "@/components/Comments";
import { MarkdownPreview } from "@/components/RTE";
import VoteButtons from "@/components/VoteButtons";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { avatars } from "@/models/client/config";
import {
    answerCollection,
    db,
    voteCollection,
    questionCollection,
    commentCollection,
    questionAttachementBucket,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { storage } from "@/models/client/config";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import slugify from "@/utils/slugify";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";
import DeleteQuestion from "@/app/questions/[quesId]/[quesName]/DeleteQuestion";
import EditQuestion from "@/app/questions/[quesId]/[quesName]/EditQuestion";
import { TracingBeam } from "@/components/ui/tracing-beam";

const Page = async ({ params }: { params: Promise<{ quesId: string; quesName: string }> }) => {
    const { quesId, quesName } = await params;
    if (!quesId) {
        return (
            <div className="text-center text-red-500 py-20 text-xl font-bold">
                Invalid question ID. Please check the URL or try again.
            </div>
        );
    }
    const [question, answers, upvotes, downvotes, comments] = await Promise.all([
        databases.getDocument(db, questionCollection, quesId),
        databases.listDocuments(db, answerCollection, [
            Query.orderDesc("$createdAt"),
            Query.equal("questionId", quesId),
        ]),
        databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", quesId),
            Query.equal("type", "question"),
            Query.equal("voteStatus", "upvoted"),
            Query.limit(1), // for optimization
        ]),
        databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", quesId),
            Query.equal("type", "question"),
            Query.equal("voteStatus", "downvoted"),
            Query.limit(1), // for optimization
        ]),
        databases.listDocuments(db, commentCollection, [
            Query.equal("type", "question"),
            Query.equal("typeId", quesId),
            Query.orderDesc("$createdAt"),
        ]),
    ]);

    const author = await users.get(question.authorId);
    const authorPrefs: UserPrefs = await users.getPrefs(question.authorId);

    return (
        <div className="bg-gradient-to-br from-black to-zinc-900 min-h-screen">
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-black to-zinc-900">
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color="#ffffff"
                    refresh
                />
                <TracingBeam className="px-6">
                    <div className="max-w-2xl mx-auto antialiased pt-8 relative">
                        <div className="mb-10">
                            <h2 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 bg-clip-text text-transparent text-sm md:text-4xl font-bold text-left mb-4">
                                {question.title}
                            </h2>

                            <div className="text-sm prose prose-sm text-neutral-300 mb-8">
                                <MarkdownPreview source={question.content} />
                            </div>

                            {question.attachementId && (
                                <div className="mb-8">
                                    <img
                                        src={storage.getFilePreview(
                                            questionAttachementBucket,
                                            question.attachementId,
                                            300,
                                            300
                                        )}
                                        alt="Question attachment"
                                        className="rounded-lg max-w-full h-auto"
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <VoteButtons
                                        type="question"
                                        id={quesId}
                                        upvotes={upvotes}
                                        downvotes={downvotes}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={avatars.getInitials(author.name, 40, 40)}
                                        alt={author.name}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <Link
                                            href={`/users/${author.$id}/${slugify(author.name)}`}
                                            className="text-orange-500 hover:underline text-sm font-medium"
                                        >
                                            {authorPrefs?.reputation || 0} • {author.name}
                                        </Link>
                                        <p className="text-neutral-400 text-xs">
                                            Asked {convertDateToRelativeTime(new Date(question.$createdAt))}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="/questions/ask">
                                        <ShimmerButton className="shadow-2xl">
                                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-sm">
                                                Ask a question
                                            </span>
                                        </ShimmerButton>
                                    </Link>
                                    <EditQuestion 
                                        questionId={question.$id} 
                                        questionTitle={question.title} 
                                        authorId={question.authorId} 
                                    />
                                    <DeleteQuestion 
                                        questionId={question.$id} 
                                        authorId={question.authorId} 
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <Comments comments={comments} type="question" typeId={quesId} />
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">
                                {answers.total} {answers.total === 1 ? "Answer" : "Answers"}
                            </h3>
                            <Answers answers={answers} questionId={quesId} />
                        </div>
                    </div>
                </TracingBeam>
            </div>
        </div>
    );
};

export default Page;
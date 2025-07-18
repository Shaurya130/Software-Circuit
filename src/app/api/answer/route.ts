import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {UserPrefs,} from "@/store/Auth"

export async function POST(request:NextRequest){
    try {

        const {questionId, authorId, answer }=await request.json();

        const response= await databases.createDocument(db, answerCollection,ID.unique(),{
            content: answer,
            authorId: authorId,
            questionId: questionId
        })

        //Inc. Reputation of author
        const prefs=await users.getPrefs<UserPrefs>(authorId)
        await users.updatePrefs(authorId,{
            reputation:Number(prefs.reputation)+ 1,
        })

        return NextResponse.json(response,{
            status:201,

        })
        
    } catch ( error:any) {
        return NextResponse.json(
            {
                error: error?.message || "Error while Creating the answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request:NextRequest){
    try {
        
        const {answerId}= await request.json()

       const answer= await databases.getDocument(db, answerCollection, answerId)

       const response=await databases.deleteDocument(db, answerCollection, answerId)

        //Dec. reputation of author
        const prefs=await users.getPrefs<UserPrefs>(answer.authorId)
        await users.updatePrefs(answer.authorId,{
            reputation:Number(prefs.reputation)-1,
        })

        return NextResponse.json(
            {data: response},
            {status: 200}
        )
    }
    catch (error:any) {
        
        return NextResponse.json(
            {
                error: error?.message || "Error in deleting the answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    
    }
}
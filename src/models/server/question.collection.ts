import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import {databases} from "./config"

export default async function createQuestionCollection() {
    //creation

    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"), //users can also read
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),   
    ]) //db id, collection id, name of collection,permission

    console.log("Question Collection donee");

    //creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        //dbid, id ofquestion collection, name of attribute, max length, required
        databases.createStringAttribute(db, questionCollection, "content", 10000,true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true , undefined, true),
        //undefined is default value, true makes it arrayable i.e. store multiple values
        databases.createStringAttribute(db, questionCollection, "attachementId", 50, false),
    ]);
    console.log("Question Attributes done");
    
    //create Indexes

    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ['asc']    
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",//index name
            IndexType.Fulltext,
            ["content"],//field name
            ['asc']    
        )
    ])
    
    //Fulltext indexes are used to:
//- Enable advanced text search (e.g., matching substrings, relevance ranking)
//- Support features like autocomplete or keyword-based filterin

}
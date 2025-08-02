import { Permission } from "node-appwrite";
import { questionAttachementBucket } from "../name";
import { storage } from "./config";

//middleware calls this to create automatically

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachementBucket);
        console.log("Storage Connected");
    } catch (error) {
        try {
            await storage.createBucket(
                questionAttachementBucket,//bucket id
                questionAttachementBucket, //bucket name
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false, // No file encryption
                undefined,// No max size
                undefined,// allow mime type
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]
            );

            console.log("Storage Created");
            console.log("Storage Connected");
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}
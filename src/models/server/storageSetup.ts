'use server';

import { Permission } from "node-appwrite";
import { questionAttachementBucket } from "../name";
import { storage } from "./config"; // ensure this file doesn't use 'use server'

// ✅ Export only async functions
export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachementBucket);
    console.log("Storage Connected");
  } catch (error) {
    console.log("Bucket not found, creating new bucket...");

    try {
      await storage.createBucket(
        questionAttachementBucket,
        questionAttachementBucket,
        [
          Permission.create("users"),
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );

      console.log("Storage Created & Connected");
    } catch (error) {
      console.error("Error creating storage:", error);
    }
  }
}

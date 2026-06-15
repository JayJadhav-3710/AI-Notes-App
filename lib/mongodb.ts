// lib/mongodb.ts
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const MONGODB_DB = "ai-notes-db";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };
let cachedClientPromise: Promise<MongoClient> | null = null;

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "ai-notes-db", // ✅ Your DB name
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}

export const clientPromise = (() => {
  if (!cachedClientPromise) {
    cachedClientPromise = MongoClient.connect(MONGODB_URI, {
      // options can be added here if needed
    });
  }
  return cachedClientPromise;
})();
// lib/mongodb.ts
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_DB = "ai-notes-db";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  return uri;
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(getMongoUri(), {
        dbName: MONGODB_DB,
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

// Connect lazily so importing this module never throws at build time
// (e.g. during `next build` page-data collection when MONGODB_URI is unset).
// The connection is only attempted when the promise is actually awaited.
export const clientPromise: Promise<MongoClient> = (async () =>
  MongoClient.connect(getMongoUri()))();
clientPromise.catch(() => {});
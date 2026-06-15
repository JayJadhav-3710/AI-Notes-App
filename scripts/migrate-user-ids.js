// Migration script to update existing notes to use email-based user IDs
// Run this script once to fix existing data

require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

async function migrateUserIds() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI not found in environment variables");
    return;
  }

  console.log("Using MongoDB URI:", uri.replace(/\/\/.*@/, "//***:***@")); // Hide credentials

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const usersCollection = db.collection("users");
    const notesCollection = db.collection("notes");

    // Get all users
    const users = await usersCollection.find({}).toArray();
    console.log(`Found ${users.length} users`);

    // Update notes to use email as userId
    for (const user of users) {
      if (user.email) {
        console.log(`Processing user: ${user.email} (old ID: ${user._id})`);

        // Find all notes for this user's old ID and update them
        const result = await notesCollection.updateMany(
          { userId: user._id.toString() },
          { $set: { userId: user.email } }
        );

        if (result.modifiedCount > 0) {
          console.log(
            `Updated ${result.modifiedCount} notes for user ${user.email}`
          );
        } else {
          console.log(`No notes found for user ${user.email}`);
        }
      }
    }

    // Also check for any notes that might have email as userId already
    const notesWithEmail = await notesCollection.find({}).toArray();
    console.log(`Total notes in database: ${notesWithEmail.length}`);

    for (const note of notesWithEmail) {
      console.log(`Note: ${note.title} - UserID: ${note.userId}`);
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.close();
  }
}

// Run the migration
migrateUserIds();

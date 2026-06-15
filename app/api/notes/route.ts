// app/api/notes/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// GET: Fetch all notes for the logged-in user
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  console.log(`🔍 GET /api/notes - User ID: ${session.user.id}, Email: ${session.user.email}`);
  
  try {
    await dbConnect();
    
    // First try to find notes with current user ID
    let notes = await Note.find({ userId: session.user.id }).lean();
    
    // If no notes found and user has email, also check for notes with email as userId
    if (notes.length === 0 && session.user.email) {
      console.log(`No notes found with userId: ${session.user.id}, checking with email: ${session.user.email}`);
      notes = await Note.find({ userId: session.user.email }).lean();
      
      // If we found notes with email, update them to use the new user ID format
      if (notes.length > 0) {
        console.log(`Found ${notes.length} notes with email as userId, updating them...`);
        await Note.updateMany(
          { userId: session.user.email },
          { $set: { userId: session.user.id } }
        );
      }
    }
    
    console.log(`Returning ${notes.length} notes for user: ${session.user.id} (email: ${session.user.email})`);
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/notes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notes." },
      { status: 500 }
    );
  }
}

// POST: Create a new note for the logged-in user
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();
    // ✅ Simple validation
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required." },
        { status: 400 }
      );
    }
    const newNote = await Note.create({
      title: body.title,
      content: body.content,
      userId: session.user.id,
      userName: session.user.name,
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/notes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create note." },
      { status: 500 }
    );
  }
}
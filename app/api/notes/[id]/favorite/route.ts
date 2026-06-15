// app/api/notes/[id]/favorite/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const { favorite } = await req.json();
    const note = await Note.findById(params.id);
    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }
    if (note.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }
    note.favorite = favorite;
    await note.save();
    return NextResponse.json(note); // Return updated note
  } catch (error) {
    console.error("PUT /api/notes/[id]/favorite error:", error);
    return NextResponse.json(
      { error: "Failed to update favorite" },
      { status: 500 }
    );
  }
}
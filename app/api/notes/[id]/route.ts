import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// PATCH /api/notes/[id] - Update a specific note (only if owned by user)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const note = await Note.findById(params.id);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    if (note.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    if (typeof body.title === "string") note.title = body.title;
    if (typeof body.content === "string") note.content = body.content;
    if (typeof body.summary === "string") note.summary = body.summary;
    if (typeof body.favorite === "boolean") note.favorite = body.favorite;
    await note.save();
    return NextResponse.json(note);
  } catch (error) {
    console.error("❌ Error updating note:", error);
    return NextResponse.json(
      { error: "Internal server error while updating note." },
      { status: 500 }
    );
  }
}

// DELETE /api/notes/[id] - Delete a specific note (only if owned by user)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
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
    await Note.findByIdAndDelete(params.id);
    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
      deletedId: note._id,
    });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    return NextResponse.json(
      { error: "Internal server error while deleting note." },
      { status: 500 }
    );
  }
}
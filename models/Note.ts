import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    favorite: { type: Boolean, default: false },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
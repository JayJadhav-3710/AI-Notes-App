import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    _id: { type: String, required: true }, // Use email as _id
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema); 
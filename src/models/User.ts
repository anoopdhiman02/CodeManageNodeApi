import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatarUrl: String,
  bio: String,
}, { timestamps: true });

export default model<IUser>("User", userSchema);

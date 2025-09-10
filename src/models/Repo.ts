import { Schema, model, Document, Types } from "mongoose";

export interface IRepo extends Document {
  owner: Types.ObjectId;
  name: string;
  description?: string;
  stars: number;
  forks: number;
  watchers: number;
}

const repoSchema = new Schema<IRepo>({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  watchers: { type: Number, default: 0 },
}, { timestamps: true });

export default model<IRepo>("Repo", repoSchema);

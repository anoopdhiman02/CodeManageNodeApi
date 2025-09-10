import { Schema, model, Document, Types } from "mongoose";

export interface ICommit extends Document {
  sha: string;
  message: string;
  author: Types.ObjectId;
  repo: Types.ObjectId;
  date: Date;
}

const commitSchema = new Schema<ICommit>({
  sha: { type: String, required: true, unique: true },
  message: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  repo: { type: Schema.Types.ObjectId, ref: "Repo", required: true },
  date: { type: Date, default: Date.now },
});

export default model<ICommit>("Commit", commitSchema);

import { Schema, model, Document, Types } from "mongoose";

export interface IIssue extends Document {
  number: number;
  title: string;
  body: string;
  state: string;
  repo: Types.ObjectId;
  author: Types.ObjectId;
}

const issueSchema = new Schema<IIssue>({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String },
  state: { type: String, default: "open" },
  repo: { type: Schema.Types.ObjectId, ref: "Repo", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default model<IIssue>("Issue", issueSchema);

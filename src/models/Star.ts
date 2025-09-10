import { Schema, model, Document, Types } from "mongoose";

export interface IStar extends Document {
  user: Types.ObjectId;
  repo: Types.ObjectId;
}

const starSchema = new Schema<IStar>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  repo: { type: Schema.Types.ObjectId, ref: "Repo", required: true },
}, { timestamps: true });

starSchema.index({ user: 1, repo: 1 }, { unique: true });

export default model<IStar>("Star", starSchema);

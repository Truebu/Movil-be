import { Schema, model } from "mongoose";

const noteSchema = Schema(
  {
    note: {
      type: String,
      required: true,
      trim: true,
    },
    user_creator_mail: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default model("Notes", noteSchema);

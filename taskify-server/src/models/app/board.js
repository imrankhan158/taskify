import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    imageUrl: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://github.com/shadcn.png`,
        localPath: "",
      },
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);

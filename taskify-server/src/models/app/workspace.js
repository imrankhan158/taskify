import mongoose, { Schema } from "mongoose";
import { UserRole } from "../../utils/constants.js";

const workspaceSchema = new Schema(
  {
    avatar: {
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
    users: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
        },
      },
    ],
    slug: {
      type: String,
      require: true,
      trim: true,
    },
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: "Organization",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Workspace = mongoose.model("Workspace", workspaceSchema);

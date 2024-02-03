import mongoose, { Schema } from "mongoose";

const todoListSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    board: {
      type: mongoose.Schema.ObjectId,
      ref: "Board",
    },
    cards: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Card",
      },
    ],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const TodoList = mongoose.model("TodoList", todoListSchema);

import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    todoList: {
      type: mongoose.Schema.ObjectId,
      ref: "TodoList",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Card = mongoose.model("Card", cardSchema);

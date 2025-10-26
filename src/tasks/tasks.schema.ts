import { Schema, Model, model } from "mongoose";
import { ITask } from "./tasks.interface";

const taskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    dueDate: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Task: Model<ITask> = model("Task", taskSchema);

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { User } from "./user.models.js";

const task = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Archived"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
      min: "2000-01-01",
      max: Date.now(),
    },
    dueTime: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

task.plugin(mongooseAggregatePaginate);

export const Task = mongoose.model("Task", task);

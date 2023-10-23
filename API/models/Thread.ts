import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Thread", ThreadSchema);

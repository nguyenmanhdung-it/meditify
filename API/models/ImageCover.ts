import mongoose from "mongoose";

var imgCoverSchema = new mongoose.Schema({
  img: {type: String, required: true},
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});

module.exports = mongoose.model("imageCover", imgCoverSchema);

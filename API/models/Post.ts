import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
    },
    photofit:{
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    thread: {
      type: String,
      default: "Chia sẻ kiến thức",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: {
          content: String,
          user: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
        required: false,
      },
    ],
  },
  { timestamps: true }
);

PostSchema.methods.toJSONFor = function (user : any) {
  return {
    _id: this._id,
    title: this.title,
    content: this.content,
    photo: this.photo,
    username: this.username,
    tags: this.tags,
    thread: this.thread,
    likes: this.likes,
    views: this.views,
    comments: this.comments,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toProfileJSONFor(user), 
    isLiked: user ? user.isLiked(this._id) : false,
  };
}

module.exports = mongoose.model("Post", PostSchema);

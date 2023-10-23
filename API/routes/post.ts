const router = require("express").Router();
const User = require("../models/User");
const CoverPhoto = require("../models/ImageCover");
const Post = require("../models/Post");

import { Request, Response } from "express";

//CREATE POST
router.post("/", async (req: Request, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json("Bạn chỉ được quyền cập nhật bài viết của chính mình :Đ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Đã xóa bài viết...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Bạn chỉ được quyền xóa bài viết của chính mình :Đ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const coverphoto = await CoverPhoto.findOne({ post_id: req.params.id });
    const post = await Post.findById(req.params.id);
    post.CoverPhoto = coverphoto;
    post["CoverPhoto"] = coverphoto;
    post.views += 0.5;
    await post.save();
    res.status(200).json({ post: post, CoverPhoto: coverphoto });
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL POSTS
router.get("/", async (req: Request, res: Response) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts: any;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        tags: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;

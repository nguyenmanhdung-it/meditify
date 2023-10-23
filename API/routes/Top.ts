const router = require("express").Router();
const User = require("../models/User");
const CoverPhoto = require("../models/ImageCover");
const Post = require("../models/Post");
import FindImg from "../utils/getUserBasic";

import { Request, Response } from "express";

// find topview posts 
router.get("/topview", async (req: Request, res: Response) => {
    try {
        const topview = await Post.find().sort({ views: -1 }).limit(4);
        // remove all content of post
        topview.forEach((post: any) => {
            post.content = "";
        });
        res.status(200).json(topview);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// find toplike posts
router.get("/toplike", async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ likes: -1 }).limit(10);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// find topcomment posts
router.get("/topcomment", async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ comments: -1 }).limit(10);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;
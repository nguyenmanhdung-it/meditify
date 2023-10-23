import { Request, Response } from "express";
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
import FindUser from "../utils/getUser";

//update
router.put("/:id", async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Bạn chỉ cập nhật được tài khoản của chính mình :Đ");
  }
});

//DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Đã xóa tài khoản... ");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("Không tìm thấy tên người dùng!");
    }
  } else {
    res.status(401).json("Bạn chỉ xóa được tài khoản của chính mình :Đ");
  }
});

//GET USER
router.get("/:id", async (req: Request, res: Response) => {
  // try {
  //   const user = await User.findById(req.params.id);
  //   const { password, ...others } = user._doc;
  //   res.status(200).json(others);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  const user = await FindUser(req.params.id);
  res.status(200).json(user);

});

module.exports = router;

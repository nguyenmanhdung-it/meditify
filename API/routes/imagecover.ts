const router = require("express").Router();
import { Request, Response } from "express";
const ImageCover = require("../models/ImageCover");

// create image
router.post("/", async (req: Request, res: Response) => {
  const newImageC = new ImageCover(req.body);
  try {
    const savedImageC = await newImageC.save();
    return res.status(200).json(savedImageC);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// update image
router.put("/", async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const imageC = await ImageCover.findOne({ post_id: req.body.post_id });
    // console.log(imageC);
      try {
          imageC.img = req.body.img;
          await imageC.save();
          return res.status(200).json(imageC);
      } catch (err) {
        return res.status(200).json("khong co anh thoi =)) loi cl");
      }
    } 
  catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

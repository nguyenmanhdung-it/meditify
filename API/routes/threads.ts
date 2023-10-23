import {Response, Request} from "express";
const router = require("express").Router();
const Thread = require("../models/Thread");

router.post("/", async (req : Request, res: Response) => {
  const newThread = new Thread(req.body);
  try {
    const savedCat = await newThread.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req: Request, res: Response) => {
    try {
      const cats = await Thread.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
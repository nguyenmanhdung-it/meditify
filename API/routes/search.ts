const router = require("express").Router();
const Post = require("../models/Post");
// find all post by matching one of the title, content, username
router.get("/:name", async (req: any, res: any) => {
  try {
    const post = await Post.find({
      $or: [
        { title: { $regex: req.params.name, $options: "i" } },
        { content: { $regex: req.params.name, $options: "i" } },
        { username: { $regex: req.params.name, $options: "i" } },
      ],
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

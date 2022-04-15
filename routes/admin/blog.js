const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all blog posts
router.get("/admin/blog", async (req, res) => {
  try {
    const blog = await db.query("SELECT * FROM blog");

    res.status(200).json({
      status: "success",
      results: blog.rows.length,
      data: {
        blog: blog.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a blog post
router.get("/admin/blog/:id", async (req, res) => {
  try {
    const post = await db.query("SELECT * FROM blog WHERE id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: post.rows.length,
      data: {
        post: post.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a blog post
router.post("/admin/blog", upload.single("images"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    await db.query(
      "INSERT INTO blog (title, imagekey, create_date, content, update_date) values ($1, $2, $3, $4, $5) RETURNING *",
      [req.body.title, result.key, new Date(), req.body.content, new Date()]
    );
  } catch (err) {
    console.log(err);
  }
});

//Update a blog post
router.put("/admin/blog/:id", async (req, res) => {
  try {
    // const file = req.file;
    // const result = await uploadFile(file);
    // res.send({ imagePath: `/images/${result.key}` });
    // await unlinkFile(file.path);

    const post = await db.query(
      "UPDATE blog SET title=$1, content=$2, update_date=$3 WHERE id=$4",
      [req.body.title, req.body.content, new Date(), req.params.id]
    );
    res.status(201).json({
      status: "success",
      results: post.rows.length,
      data: {
        post: post.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//Delete a blog post
router.delete("/admin/blog/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM blog WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

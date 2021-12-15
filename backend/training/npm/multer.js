const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
      // const fs = require('fs')
      // try {
      //   fs.readdirSync('uploads')
      // } catch (err) {
      //   console.error('uploads 폴더가 없으면 새로운 폴더를 만듦');
      //   fs.mkdirSync('uploads')
      // }
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "multi.html"));
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("multer server");
});

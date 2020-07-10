const express = require("express");
const multer = require("multer");
const upload = multer({});
var mongoose = require("mongoose");
var gridfs = require("gridfs-stream");
var fs = require("fs");
var FileReader = require("filereader");
// fileReader = new FileReader()

const router = express.Router();

function encodeImageFileAsURL(element) {
  var file = element;
  var fileReader = new window.FileReader();
  fileReader.setNodeChunkedEncoding(true || false);
  fileReader.readAsDataURL(new File(req));
  return reader.readAsDataURL(file);
}

router.post("/base64", upload.single("single"), async (req, res) => {
  const file = req.file;
  const fileReader = new FileReader();
  //const text = encodeImageFileAsURL(file);
  fileReader.setNodeChunkedEncoding(true || false);
  const text = fileReader.readAsDataURL(new File(req.file));
  res.send(text);
});

gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  const gfs = gridfs(connection.db);
  router.post("/upload", upload.single("single"), async (req, res) => {
    console.log(req.file);
    var writestream = gfs.createWriteStream({ filename: "image" });
    fs.createReadStream(req.file).pipe(writestream);
    writestream.on("close", function (file) {
      res.send("File Created : " + file.filename);
    });
  });
});

module.exports = router;

const express = require("express");
const uploadexcelproductcontroller = require("../controllers/uploadexcelproduct/uploadexcelproductcontroller");
const multer = require("multer");
const convertpngtopdf = require("../controllers/uploadexcelproduct/convertpngtopdf");
const convertLinkToPdf = require("../controllers/uploadexcelproduct/convertlinktopdf");
const convertDocxToPdf = require("../controllers/uploadexcelproduct/convertdocxtopdf");
const youtubevideodownload = require("../controllers/uploadexcelproduct/youtubevideodownload");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router.post("/upload-csv", upload.single("file"), uploadexcelproductcontroller);
router.post("/upload-png", upload.single("file"), convertpngtopdf);
router.post("/upload-link", convertLinkToPdf);
router.post("/upload-docx", upload.single("file"), convertDocxToPdf);
router.get("/download-video", youtubevideodownload);

// router.get("/", uploadexcelproductcontroller);
module.exports = router;

var express = require('express');
var router = express.Router();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 4000;

// เปิดใช้งาน CORS
app.use(cors());

// สร้างโฟลเดอร์สำหรับจัดเก็บไฟล์ (ถ้ายังไม่มี)
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// กำหนดการตั้งค่าของ multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // บันทึกไฟล์ในโฟลเดอร์ uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // ตั้งชื่อไฟล์ใหม่
  },
});

const upload = multer({ storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route สำหรับอัปโหลดไฟล์
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join("uploads", req.file.filename);
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `http://localhost:${PORT}/${filePath}`, // URL สำหรับเข้าถึงไฟล์
  });
});

// Static route สำหรับเสิร์ฟไฟล์ที่อัปโหลด
app.use("/uploads", express.static(uploadDir));

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = router;

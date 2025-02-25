const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 5000;
const Certificate = require("../models/certificate.model");

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

// API สำหรับเพิ่มข้อมูลของ Certificate
router.post("/api/certificates", async (req, res) => {
  console.log("Certificate API is working...");

  try {
    const {
      ownerAddress,
      firstName,
      lastName,
      studentId,
      issueBy,
      issueDate,
      certificateName,
      account,
      imgHash,
    } = req.body;

    if (!ownerAddress || !firstName || !lastName || !studentId || !issueBy || !issueDate || !certificateName || !account || !imgHash) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCertificate = new Certificate({
      ownerAddress,
      firstName,
      lastName,
      studentId,
      issueBy,
      issueDate,
      certificateName,
      account,
      imgHash,
    });

    await newCertificate.save();
    res.status(201).json({ message: "Certificate added successfully", certificate: newCertificate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = router;

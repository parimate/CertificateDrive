// import statements สำหรับใช้ useState จาก React และ axios สำหรับการทำ HTTP requests
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Component ชื่อ FileUpload รับ props 3 ตัว contract, account, provider
const FileInput = ({ contract, account }) => {
  // สร้าง state 2 ตัวคือ file และ fileName โดยให้เริ่มต้นค่าเป็น null และ "No image selected" ตามลำดับ
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  // function ชื่อ handleSubmit ทำการอัปโหลดภาพไปยัง IPFS เมื่อผู้ใช้กด submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formDataUpload,
          headers: {
            pinata_api_key: `1017366b54483158e7bb`,
            pinata_secret_api_key: `e928f7d29be0a8ef84784d2af8a3925cdb2f5bcb961fd7b4e3193318d6bc7a2e`,
            "Content-Type": "multipart/form-data",
          },
        });

        //เก็บข้อมูลจาก form
        const OwnerAddress = document.getElementById("studentAccount").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const studentId = document.getElementById("studentId").value;
        const faculty = document.getElementById("faculty").value;
        const department = document.getElementById("department").value;
        const certificateName = document.getElementById("certificateName").value;

        // สร้าง URL ของภาพที่อัปโหลดเพื่อใช้ในการเก็บข้อมูลลงในสัญญาอัจฉริยะบนเครือข่าย Ethereum
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        // เรียกใช้ function add ในสัญญาอัจฉริยะโดยให้พารามิเตอร์ account และ ImgHash
        await contract.add(OwnerAddress, firstName, lastName, studentId, faculty, department, certificateName, account, 0, ImgHash);

        alert("Successfully Image Uploaded"); // แสดงข้อความแจ้งเตือนว่าอัปโหลดภาพสำเร็จ
        setFileName("No image selected"); // รีเซ็ตชื่อไฟล์ที่เลือกให้เป็น "No image selected"
        setFile(null); // รีเซ็ต state file เป็น null เพื่อให้สามารถเลือกภาพใหม่ได้
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata"); // แสดงข้อความแจ้งเตือนว่าไม่สามารถอัปโหลดภาพไปยัง Pinata ได้
      }
    }
  };

  // ฟังก์ชัน retrieveFile ใช้สำหรับดึงข้อมูลของไฟล์ที่ผู้ใช้เลือก
  const retrieveFile = (e) => {
    // ดึงข้อมูลของไฟล์จากอีเวนต์ที่เกิดขึ้น
    const data = e.target.files[0];
    // สร้าง Reader ของไฟล์เพื่ออ่านข้อมูลเป็น Array Buffer
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    // เมื่อการอ่านข้อมูลเสร็จสิ้น
    reader.onloadend = () => {
      // กำหนดข้อมูลไฟล์ใน state file
      setFile(e.target.files[0]);
    };
    // ป้องกันการกระทำเดิมของอีเวนต์
    e.preventDefault();
  };

  // ฟังก์ชัน handleSubmitForm ใช้สำหรับการตรวจสอบความถูกต้องของฟอร์มเมื่อผู้ใช้กด submit
  const handleSubmitForm = (event) => {
    // ดึงข้อมูลของฟอร์ม
    const form = event.currentTarget;
    // ถ้าฟอร์มไม่ถูกต้อง
    if (form.checkValidity() === false) {
      // ป้องกันการกระทำเดิมของอีเวนต์ submit
      event.preventDefault();
      // ป้องกันการกระทำต่อจากนั้นของอีเวนต์
      event.stopPropagation();
    }
    // กำหนด state validated เป็น true เพื่อแสดงว่าฟอร์มถูกต้อง
    setValidated(true);
  };

  const handleOwnerClick = () => {
    navigate('/page/ownerDisplay');
  };


  return (
    <>
      <div className="container mx-auto mt-3 max-w-2xl w-full">
        <h1 style={{ color: "black", fontSize: "2rem", textAlign: "center" }}>Certificate Upload </h1>
        <form className="mt-3 max-w-full  mx-auto" validated={validated} onSubmit={handleSubmitForm}>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Student Account
            <input
              id="studentAccount"
              type="text"
              className="grow"
              placeholder="Input studentAccount"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            First Name
            <input
              id="firstName"
              type="text"
              className="grow"
              placeholder="Input FirstName"
              defaultValue="Satoshi"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Last Name
            <input
              id="lastName"
              type="text"
              className="grow"
              placeholder="Input LastName"
              defaultValue="Nakamoto"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Student ID
            <input
              id="studentId"
              type="text"
              className="grow"
              placeholder="Input ID"
              defaultValue="6510120030"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Faculty
            <input
              id="faculty"
              type="text"
              className="grow"
              placeholder="Input Faculty"
              defaultValue="Engineering"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Department
            <input
              id="department"
              type="text"
              className="grow"
              placeholder="Input Department"
              defaultValue="Computer Engineering"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Certificate Name
            <input
              id="certificateName"
              type="text"
              className="grow"
              placeholder="Input CertificateName"
              defaultValue="Basic Programing"
            />
          </label>
        </form>

        {/* File upload section */}
        <div className="mt-2">
          <form className="mt-6 ml-6 items-center w-full" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Choose Certificate File
            </label>
            <div className="mt-4 ml-1 flex items-center w-full">
              <input
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                disabled={!account} // ปิดการใช้งาน input ถ้าไม่มี account ที่ถูกส่งมาใน props
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile} // เมื่อมีการเลือกไฟล์ใหม่ให้เรียกใช้งานฟังก์ชัน retrieveFile
              />
              <button
                type="submit"
                className=" ml-8 btn btn-secondary btn-lg "
                disabled={!file}
              >
                Upload File
              </button>
              <div >
                <button className="btn ml-8 btn-primary" onClick={handleOwnerClick}>View Certificate</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FileInput;

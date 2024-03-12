import React, { useState } from "react";
import Navbar from '../components/navbar';
import axios from "axios";

// Component ชื่อ FileUpload รับ props 3 ตัว contract, account, provider
function UploadFile({ contract, account }) {
  // สร้าง state 2 ตัวคือ file และ fileName โดยให้เริ่มต้นค่าเป็น null และ "No image selected" ตามลำดับ
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [validated, setValidated] = useState(false);
  
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

        // Collect additional data from the form
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
        await contract.add(OwnerAddress,firstName, lastName, studentId, faculty, department, certificateName, account, 0, ImgHash); 

        alert("Successfully Image Uploaded"); // แสดงข้อความแจ้งเตือนว่าอัปโหลดภาพสำเร็จ
        setFileName("No image selected"); // รีเซ็ตชื่อไฟล์ที่เลือกให้เป็น "No image selected"
        setFile(null); // รีเซ็ต state file เป็น null เพื่อให้สามารถเลือกภาพใหม่ได้
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata"); // แสดงข้อความแจ้งเตือนว่าไม่สามารถอัปโหลดภาพไปยัง Pinata ได้
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  const handleSubmitForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-7 max-w-2xl w-full">
        <form className="max-w-full  mx-auto" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 mb-4">
            Student Account
            <input
              id="studentAccount"
              type="text"
              className="grow"
              placeholder="Input studentAccount"
              value=""
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            First Name
            <input
              id="firstName"
              type="text"
              className="grow"
              placeholder="Input FirstName"
              value=""
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Last Name
            <input
              id="lastName"
              type="text"
              className="grow"
              placeholder="Input LastName"
              value=""
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Student ID
            <input
              id="studentId"
              type="text"
              className="grow"
              placeholder="Input ID"
              value=""
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Faculty
            <input
              id="faculty"
              type="text"
              className="grow"
              placeholder="Input Faculty"
              value=""
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Department
            <input
              id="department"
              type="text"
              className="grow"
              placeholder="Input Department"
              value=""
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Certificate Name
            <input
              id="certificateName"
              type="text"
              className="grow"
              placeholder="Input CertificateName"
              value=""
            />
          </label>

          {/* File upload section */}
          <div className="mt-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Choose Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
              <span className="ml-3 textArea">Image: {fileName}</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
            noValidate
            validated={validated}
            onSubmit={handleSubmitForm}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadFile;

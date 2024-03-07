import React, { useState } from "react";
import Navbar from '../components/navbar';
import axios from "axios";

<<<<<<< HEAD
function UploadPage({contract, account, provider}) {
  // สร้าง state 2 ตัวคือ file และ fileName โดยให้เริ่มต้นค่าเป็น null และ "No image selected" ตามลำดับ
=======
function Upload({ contract, account }) {
>>>>>>> parent of 43ea8b9 (edit 7/3/2567)
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [validated, setValidated] = useState(false);

<<<<<<< HEAD
  const [formData, setFormData] = useState({
    certificateName: "",
    firstName: "",
    lastName: "",
    studentId: "",
    faculty: "",
    department: "",
  });



  // function ชื่อ handleSubmit ทำการอัปโหลดภาพไปยัง IPFS เมื่อผู้ใช้กด submit form
=======
>>>>>>> parent of 43ea8b9 (edit 7/3/2567)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form behavior
    // Add your file upload logic here

    if (file) { // ตรวจสอบว่ามีไฟล์ที่เลือกอยู่หรือไม่
      try {
        // สร้าง FormData และเพิ่มไฟล์ที่เลือกเข้าไปใน formData
        const formData = new FormData();
        formData.append("file", file);

        // ทำ HTTP POST request ไปยัง API ของ Pinata เพื่ออัปโหลดภาพไปยัง IPFS
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `1017366b54483158e7bb`,
            pinata_secret_api_key: `e928f7d29be0a8ef84784d2af8a3925cdb2f5bcb961fd7b4e3193318d6bc7a2e`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Collect additional data from the form
        const OwnerAddress = document.getElementById("OwnerAddress").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const studentId = document.getElementById("studentId").value;
        const faculty = document.getElementById("faculty").value;
        const department = document.getElementById("department").value;
        const certificateName = document.getElementById("certificateName").value;
        //const gasLimit = 500000; // Set an appropriate gas limit

        // สร้าง URL ของภาพที่อัปโหลดเพื่อใช้ในการเก็บข้อมูลลงในสัญญาอัจฉริยะบนเครือข่าย Ethereum
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        // เรียกใช้ function add ในสัญญาอัจฉริยะโดยให้พารามิเตอร์ account และ ImgHash
        await contract.add(OwnerAddress, firstName, lastName, studentId, faculty, department, certificateName, account, 0, ImgHash);

        alert("Successfully Image Uploaded"); // แสดงข้อความแจ้งเตือนว่าอัปโหลดภาพสำเร็จ
        setFileName("No image selected"); // รีเซ็ต state file เป็น null เพื่อให้สามารถเลือกภาพใหม่ได    
        setFile(null); // รีเซ็ต state file เป็น null เพื่อให้สามารถเลือกภาพใหม่ได 
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata"); // แสดงข้อความแจ้งเตือนว่าไม่สามารถอัปโหลดภาพไปยัง Pinata ได้
      }
    }
  };

  // function ชื่อ retrieveFile ทำการดึงข้อมูลจากไฟล์ที่ผู้ใช้เลือกและอัปเดต state file และ fileName
  const retrieveFile = (e) => {
    const data = e.target.files[0]; // ดึงข้อมูลไฟล์ที่เลือกมาจาก event
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data); // อ่านข้อมูลไฟล์เป็น ArrayBuffer
    reader.onloadend = () => {
      setFile(e.target.files[0]); // อัปเดต state file ด้วยไฟล์ที่เลือก
    };
    e.preventDefault(); // ป้องกันการเรียกใช้งาน default behavior ของ element input type="file"
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
<<<<<<< HEAD
      
      <div className="container mx-auto mt-5">
        <form onSubmit={handleSubmitForm} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="StudentAddres" className="block text-sm font-medium text-gray-600">
              StudentAddres
            </label>
            <input
              type="text"
              id="certificateName"
              name="certificateName"
              value={formData.certificateName}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
=======

      <div className="container mx-auto mt-7 max-w-2xl">
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Owner Address
            <input id="OwnerAddress" type="text" className="grow" placeholder="Input Address" />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            FirstName
            <input id="firstName" type="text" className="grow" placeholder="Input FirstName" />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Last name
            <input id="lastName" type="text" className="grow" placeholder="Input LastName" />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Student ID
            <input id="studentId" type="text" className="grow" placeholder="Input ID" />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Faculty
            <input id="faculty" type="text" className="grow" placeholder="Input Faculty" />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Department
            <input id="department" type="text" className="grow" placeholder="Input Department" />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Certificate Name
            <input id="certificateName" type="text" className="grow" placeholder="Input CertificateName" />
          </label>

          {/* File upload section */}
          <div className="mt-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Choose Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                disabled={!account} // ปิดการใช้งาน input ถ้าไม่มี account ที่ถูกส่งมาใน props
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile} // เมื่อมีการเลือกไฟล์ใหม่ให้เรียกใช้งานฟังก์ชัน retrieveFile
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
              
              {/* <label
                htmlFor="file-upload"
                className={`${!account ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white p-2 rounded-md cursor-pointer`}
              >
                Upload File
              </label> */}
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
>>>>>>> parent of 43ea8b9 (edit 7/3/2567)

          <div className="mb-4">
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-600">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-600">
              Faculty
            </label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="certificateName" className="block text-sm font-medium text-gray-600">
              Certificate Name
            </label>
            <input
              type="text"
              id="certificateName"
              name="certificateName"
              value={formData.certificateName}
              onChange={retrieveFile}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <input type="file" className="file-input file-input-bordered w-full max-w-xs" />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;

// import statements สำหรับใช้ useState จาก React และ axios สำหรับการทำ HTTP requests
import React,{ useState } from "react";
import axios from "axios";



// Component ชื่อ FileUpload รับ props 3 ตัว contract, account, provider
const FileInput = ({ contract, account}) => {
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
        // const OwnerAddress = document.getElementById("studentAccount").value;
        // const firstName = document.getElementById("firstName").value;
        // const lastName = document.getElementById("lastName").value;
        // const studentId = document.getElementById("studentId").value;
        // const faculty = document.getElementById("faculty").value;
        // const department = document.getElementById("department").value;
        // const certificateName = document.getElementById("certificateName").value;

        const OwnerAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
        const firstName = "parimate"
        const lastName = "jaaroensong"
        const studentId = "6510120030"
        const faculty = "Engineering"
        const department = "Computer Engineering"
        const certificateName = "Basic Programing"

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
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Last Name
            <input
              id="lastName"
              type="text"
              className="grow"
              placeholder="Input LastName"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Student ID
            <input
              id="studentId"
              type="text"
              className="grow"
              placeholder="Input ID"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Faculty
            <input
              id="faculty"
              type="text"
              className="grow"
              placeholder="Input Faculty"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Department
            <input
              id="department"
              type="text"
              className="grow"
              placeholder="Input Department"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Certificate Name
            <input
              id="certificateName"
              type="text"
              className="grow"
              placeholder="Input CertificateName"
            />
          </label>
        </form>

        {/* File upload section */}
        <div className="mt-6">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Choose Certificate File
            </label>
            <div className="mt-5 ml-8 flex items-center w-full">
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
                className=" ml-8 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                disabled={!file}
              >
                Upload File
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FileInput;

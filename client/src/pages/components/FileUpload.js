// import statements สำหรับใช้ useState จาก React และ axios สำหรับการทำ HTTP requests
import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


// Component ชื่อ FileUpload รับ props 3 ตัว contract, account, provider
const FileUpload = ({ contract, account, provider }) => {
  // สร้าง state 2 ตัวคือ file และ fileName โดยให้เริ่มต้นค่าเป็น null และ "No image selected" ตามลำดับ
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [validated, setValidated] = useState(false);

  // function ชื่อ handleSubmit ทำการอัปโหลดภาพไปยัง IPFS เมื่อผู้ใช้กด submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการเรียกใช้งาน default behavior ของ form

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

        // สร้าง URL ของภาพที่อัปโหลดเพื่อใช้ในการเก็บข้อมูลลงในสัญญาอัจฉริยะบนเครือข่าย Ethereum
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        // Collect additional data from the form
        const name = document.getElementById("validationCustom01").value;
        const studentId = document.getElementById("validationCustomID").value;
        const certificateName = document.getElementById("validationCustom03").value;
        const faculty = document.getElementById("validationCustom04").value;
        const department = document.getElementById("validationCustom05").value;


        contract.add(account, ImgHash, name, studentId, certificateName, faculty, department); // เรียกใช้ function add ในสัญญาอัจฉริยะโดยให้พารามิเตอร์ account และ ImgHash
        alert("Successfully Image Uploaded"); // แสดงข้อความแจ้งเตือนว่าอัปโหลดภาพสำเร็จ
        setFileName("No image selected"); // รีเซ็ตชื่อไฟล์ที่เลือกให้เป็น "No image selected"
        setFile(null); // รีเซ็ต state file เป็น null เพื่อให้สามารถเลือกภาพใหม่ได้
      } catch (e) {
        alert("Unable to upload image to Pinata"); // แสดงข้อความแจ้งเตือนว่าไม่สามารถอัปโหลดภาพไปยัง Pinata ได้
      }
    }
    alert("Successfully Image Uploaded"); // แสดงข้อความแจ้งเตือนว่าอัปโหลดภาพสำเร็จ (บรรทัดนี้อาจซ้ำกัน)
    setFileName("No image selected"); // รีเซ็ตชื่อไฟล์ที่เลือกให้เป็น "No image selected" (บรรทัดนี้อาจซ้ำกัน)
    setFile(null); // รีเซ็ต state file เป็น null เพื่อให้สามารถเลือกภาพใหม่ได้ (บรรทัดนี้อาจซ้ำกัน)
    setValidated(true);
    
  };

  // function ชื่อ retrieveFile ทำการดึงข้อมูลจากไฟล์ที่ผู้ใช้เลือกและอัปเดต state file และ fileName
  const retrieveFile = (e) => {
    const data = e.target.files[0]; // ดึงข้อมูลไฟล์ที่เลือกมาจาก event
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data); // อ่านข้อมูลไฟล์เป็น ArrayBuffer
    reader.onloadend = () => {
      setFile(e.target.files[0]); // อัปเดต state file ด้วยไฟล์ที่เลือก
    };
    setFileName(e.target.files[0].name); // อัปเดต state fileName ด้วยชื่อไฟล์ที่เลือก
    e.preventDefault(); // ป้องกันการเรียกใช้งาน default behavior ของ element input type="file"
  };

  const handleSubmitForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //setValidated(true);
  };

  // JSX ส่วนที่แสดงผลบนหน้าจอ
  return (
    <div className="top">
      <h1 style={{ color: "black" }}>Certificate Upload</h1>

      <div className="formText">
      <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="First name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Last name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomID">
            <Form.Label>Student ID</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">No.</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Student ID"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a Student ID.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Certificate Name</Form.Label>
            <Form.Control type="text" placeholder="Basic Programing" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Certificate Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Faculty</Form.Label>
            <Form.Control type="text" placeholder="Engineering" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Faculty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" placeholder="Computer Engineering" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Department.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
      </div>
      <br />

      <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account} // ปิดการใช้งาน input ถ้าไม่มี account ที่ถูกส่งมาใน props
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile} // เมื่อมีการเลือกไฟล์ใหม่ให้เรียกใช้งานฟังก์ชัน retrieveFile
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
      </div>

    </div>
  );
};

export default FileUpload;

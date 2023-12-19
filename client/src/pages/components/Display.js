import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
  const [data, setData] = useState("");

  // ฟังก์ชัน getdata เพื่อดึงข้อมูลภาพจาก contract
  const getdata = async () => {
    // ดึงค่าที่อยู่ที่ต้องการดึงภาพ
    const Otheraddress = document.querySelector(".address").value;
    let dataArray;

    try {
      if (Otheraddress) {
        // เรียกใช้งานฟังก์ชัน display ใน contract และส่งที่อยู่ที่ต้องการดึงภาพเข้าไป
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        // ถ้าไม่ได้ใส่ที่อยู่ ให้ดึงภาพของบัญชีปัจจุบัน (account)
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access"); // แสดงข้อความแจ้งเตือนในกรณีที่ไม่สามารถดึงภาพได้
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) { // ตรวจสอบว่ามีข้อมูลภาพหรือไม่
      const str = dataArray.toString();
      const str_array = str.split(",");
      
      
      // // สร้างอาร์เรย์ของภาพที่ดึงมาจาก contract เพื่อแสดงผลทีละภาพ
      // const images = str_array.map((item, i) => {

        // สร้างอาร์เรย์ของภาพที่ดึงมาจาก contract เพื่อแสดงผลทีละภาพ
      const images = str_array.map((data, i) => {
        return (
          
          <div key={i} className="image-container">
             <div className="image-info">
              {/* Display additional information */}
              <p>Full Name: {data.fullName}</p>
              <p>Student ID: {data.studentId}</p>
              <p>Faculty: {data.faculty}</p>
              <p>Department: {data.department}</p>
              <p>Certificate Name: {data.certificateName}</p>
              
            </div>

          <a href={data} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${data.substring(6)}`}
              alt="Click Link"
            ></img>
          </a>
          <br/>
          </div>
        );
      });
      setData(images); // อัปเดต state data เพื่อแสดงภาพที่ดึงมาจาก contract
    } else {
      alert("No image to display"); // แสดงข้อความแจ้งเตือนในกรณีที่ไม่มีภาพที่ต้องการแสดง
    }
  };

  // JSX ส่วนที่แสดงผลบนหน้าเว็บ
  return (
    <>
      <h1 style={{ color: "black" }}>Certificate list</h1>
      <div className="image-list">{data}</div>
      {/* ตัวอินพุตสำหรับกรอกที่อยู่ที่ต้องการดึงภาพ */}
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      {/* ปุ่มที่ให้คลิกเพื่อดึงภาพ */}
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;

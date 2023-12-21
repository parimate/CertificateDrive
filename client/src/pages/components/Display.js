import { useState, useEffect, useCallback } from "react";
import "./Display.css";
import Table from 'react-bootstrap/Table';

const Display = ({ contract, account }) => {
  // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
  const [data, setData] = useState("");
  const [sharedData, setSharedData] = useState([]);
  const [showSharedData, setShowSharedData] = useState(false);

  // ฟังก์ชันเพื่อดึงข้อมูลภาพจาก contract
  const getdata = async () => {
    let dataArray;
    // ดึงค่าที่อยู่ที่ต้องการดึงภาพ
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        // เรียกใช้งานฟังก์ชัน display ใน contract และส่งที่อยู่ที่ต้องการดึงภาพเข้าไป
        dataArray = await contract.display(Otheraddress);
      } else {
        // ถ้าไม่ได้ใส่ที่อยู่ ให้ดึงภาพของบัญชีปัจจุบัน (account)
        dataArray = await contract.display(account);
      }
    } catch (e) {
      // แสดงข้อความแจ้งเตือนในกรณีที่ไม่สามารถดึงภาพได้
      alert("You don't have access");
      return;
    }

    //การตรวจสอบว่า dataArray นั้นว่างเปล่าหรือไม่
    const isEmpty = Object.keys(dataArray).length === 0;

    // ถ้า dataArray ไม่ว่างเปล่า
    if (!isEmpty) {
      // แปลง `dataArray` เป็น string
      const str = dataArray.toString();
      // แบ่ง string ที่ได้เป็น array โดยใช้ ";" เป็นตัวแบ่ง
      const str_array = str.split(";");
      // สร้างอาร์เรย์ของภาพที่ดึงมาจาก contract เพื่อแสดงผลทีละภาพ
      const images = str_array.map((item, i) => {
        // แยกข้อมูลจาก item แล้วแสดงผล
        //const [list, firstName, lastName, studentId, faculty, department, certificateName] = item.split(",");
        const splitItems = item.split(",");
        const certificateName = splitItems.pop();
        const department = splitItems.pop();
        const faculty = splitItems.pop();
        const studentId = splitItems.pop();
        const lastName = splitItems.pop();
        const firstName = splitItems.pop();
        const list = splitItems.join(","); // คำสั่ง join ใช้เพื่อรวมข้อมูลที่เหลือกันให้เป็น string และใช้ตัวคั่นเป็น ","
                
        
        return (
          <div key={i} className="image-container">
            <div className="image-info">
              <p>list {list}</p>
              <p>First Name: {firstName}</p>
              <p>Last Name: {lastName}</p>
              <p>Student ID: {studentId}</p>
              <p>Faculty: {faculty}</p>
              <p>Department: {department}</p>
              <p>Certificate Name: {certificateName}</p>
            </div>
            <a href={item} key={i} target="_blank" rel="noreferrer">
              <img
                key={i}
                src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                alt="Click Link"
                className="image-list"
              ></img>
            </a>
            <br />
          </div>
        );
      });
      setData(images); // อัปเดต state data เพื่อแสดงภาพที่ดึงมาจาก contract
    } else {
      // แสดงข้อความแจ้งเตือนในกรณีที่ไม่มีภาพที่ต้องการแสดง
      alert("No image to display");
    }
  };

  // ฟังก์ชันสำหรับการดึงข้อมูลที่ได้รับการแชร์ผ่าน contract
  const getSharedData = useCallback(async () => {
    try {
      // เรียกใช้งานฟังก์ชัน shareAccess จาก contract เพื่อดึงข้อมูล
      const result = await contract.shareAccess();

      // อัปเดตข้อมูลที่ได้รับจาก contract ไปยัง state ของ component
      setSharedData(result);
    } catch (e) {
      // แสดงข้อความแจ้งเตือนในกรณีที่เกิดข้อผิดพลาด
      //alert("Error fetching shared data");
    }
  }, [contract]);

  // เมื่อ component ถูกโหลดหรือ state ที่เกี่ยวข้องมีการเปลี่ยนแปลง
  // ให้เรียกใช้งานฟังก์ชัน getSharedData เพื่อดึงข้อมูลที่ได้รับการแชร์ใหม่
  useEffect(() => {
    getSharedData();
  }, [getSharedData]);


  return (
    <>
      <h1 style={{ color: "black" }}>Certificate list</h1>
      <p>Current Timestamp: { }</p>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>Get Data</button><br />

      {/* ปุ่มเพิ่มเติมสำหรับแสดง/ซ่อนข้อมูลที่ได้จาก shareAccess */}
      <button className="shared" onClick={() => setShowSharedData(!showSharedData)}>
        Shared Access Data
      </button>
      <br />
      <br />

      {/* แสดงข้อมูลที่ได้จาก shareAccess เมื่อคลิกปุ่ม */}
      {showSharedData && (
        <div className="shared-data">
          <h2>Shared Access Data</h2><br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Student ID</th>
                <th>Faculty</th>
                <th>Department</th>
                <th>Certificate Name</th>
                <th>Address User</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {sharedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastNameName}</td>
                  <td>{item.studentId}</td>
                  <td>{item.faculty}</td>
                  <td>{item.department}</td>
                  <td>{item.certificateName}</td>
                  <td>{item.user}</td>
                  <td>
                    {item.fileHash ? (
                      <a href={`https://gateway.pinata.cloud/ipfs/${item.fileHash}`} target="_blank" rel="noreferrer">
                        View Image
                      </a>
                    ) : (
                      "No Image Link"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Display;

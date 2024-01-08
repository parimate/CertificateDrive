import { useState, useEffect, useCallback } from "react";
import "./Display.css";
import Table from 'react-bootstrap/Table';

const Display = ({ contract, account }) => {
  // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
  const [data, setData] = useState([]);
  const [sharedData, setSharedData] = useState([]);
  const [showSharedData, setShowSharedData] = useState(false);
  const [Timestamp, setTimestamp] = useState(null);

  // ฟังก์ชันเพื่อดึงข้อมูลภาพจาก contract
  const getdata = async () => {

    fetchCurrentTimestamp();
    let dataArray = [];

    // ดึงค่าที่อยู่ที่ต้องการดึงภาพ
    const Otheraddress = document.querySelector(".address").value;


    try {
      if (Otheraddress) {
        // เรียกใช้งานฟังก์ชัน display ใน contract และส่งที่อยู่ที่ต้องการดึงภาพเข้าไป
        dataArray = await contract.display(Otheraddress);
        console.log("dataArray:", dataArray);
        setData(dataArray);
      } else {
        // ถ้าไม่ได้ใส่ที่อยู่ ให้ดึงภาพของบัญชีปัจจุบัน (account)
        dataArray = await contract.display(account);
        console.log("dataArray:", dataArray);
        setData(dataArray);
      }
    } catch (e) {
      // แสดงข้อความแจ้งเตือนในกรณีที่ไม่สามารถดึงภาพได้
      alert("You don't have access");
      return;
    }

    // ตรวจสอบว่า dataArray ไม่ใช่ array หรือว่างเปล่า
    const isEmpty = !Array.isArray(dataArray) || dataArray.length === 0;

    // ถ้า dataArray ไม่ว่างเปล่า
    if (!isEmpty) {
      setData(
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
            {dataArray.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.studentId}</td>
                <td>{item.faculty}</td>
                <td>{item.department}</td>
                <td>{item.certificateName}</td>
                <td>{item.user}</td>
                <td>
                  {item.imageUrl ? (
                    <a href={`${item.imageUrl}`} target="_blank" rel="noreferrer">
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
        );
    } else {
      // แสดงข้อความแจ้งเตือนในกรณีที่ไม่มีภาพที่ต้องการแสดง
      alert("No image to display");
    }
  };

  const fetchCurrentTimestamp = useCallback(async () => {
    if (contract) {
      try {
        const currentTimestamp = await contract.getCurrentTimestamp();
        setTimestamp(currentTimestamp.toString());
      } catch (error) {
        console.error("Error fetching current timestamp:", error);
      }
    }
  }, [contract]);

  const unixTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // มีการคูณ 1000 เพื่อแปลงเป็น millisecond
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // เพิ่ม 1 เพราะเดือนเริ่มที่ 0
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // ฟังก์ชันสำหรับการดึงข้อมูลที่ได้รับการแชร์ผ่าน contract
  const getSharedData = useCallback(async () => {
    try {
      // เรียกใช้งานฟังก์ชัน shareAccess จาก contract เพื่อดึงข้อมูล
      const result = await contract.shareAccess();
      console.log("result", result);
      // อัปเดตข้อมูลที่ได้รับจาก contract ไปยัง state ของ component
      setSharedData(result);
    } catch (e) {
      // แสดงข้อความแจ้งเตือนในกรณีที่เกิดข้อผิดพลาด
      //alert("Error fetching shared data");
      console.log("Error fetching shared data");
    }
  }, [contract]);

  // เมื่อ component ถูกโหลดหรือ state ที่เกี่ยวข้องมีการเปลี่ยนแปลง
  // ให้เรียกใช้งานฟังก์ชัน getSharedData เพื่อดึงข้อมูลที่ได้รับการแชร์ใหม่
  useEffect(() => {
    getSharedData();
    fetchCurrentTimestamp();
  }, [contract, getSharedData, fetchCurrentTimestamp]);


  return (
    <>
      <h1 style={{ color: "black" }}>Certificate list</h1>
      <br />
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
                  <td>{item.lastName}</td>
                  <td>{item.studentId}</td>
                  <td>{item.faculty}</td>
                  <td>{item.department}</td>
                  <td>{item.certificateName}</td>
                  <td>{item.user}</td>
                  <td>
                    {item.imageUrl ? (
                      <a href={`${item.imageUrl}`} target="_blank" rel="noreferrer">
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
      <br /><br />



      <h1 style={{ color: "black" }}>Certificate Display</h1>
      <p>Block Timestamp: Unix:{Timestamp} , Date:{unixTimestampToDate(Timestamp)}</p>
      <div className="shared-data">{data}</div>
      <br />
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>Get Data</button><br />
    </>
  );
};

export default Display;

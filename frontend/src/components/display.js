import React, { useState, useEffect, useCallback } from "react";

function Display({ contract }) {
  // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
  const [sharedData, setSharedData] = useState([]);
  const [Timestamp, setTimestamp] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const fetchCurrentTimestamp = useCallback(async () => {
    if (contract) {
      try {
        const currentTimestamp = await contract.getCurrentTimestamp();
        setTimestamp(currentTimestamp.toString());
      } catch (error) {
        if (error.message.includes("revert")) {
          console.error("Revert reason:", error.reason);
        } else {
          console.error("Error fetching current timestamp:", error);
        }
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
      // // เรียงลำดับข้อมูลใหม่ โดยข้อมูลล่าสุดจะอยู่ด้านบน
      //result.reverse();
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

  const openModal = (fileUrl) => {
    setModalImage(fileUrl);
    document.getElementById("image_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("image_modal").close();
    setModalImage(null);
  };

  return (
    <>
      <br />
      <h1 className="text-2xl font-bold text-center">Certificate list</h1>
      <p className="text-1xl text-center mb-4 mt-2">
        Block Timestamp: Unix:{Timestamp} , Date:
        {unixTimestampToDate(Timestamp)}
      </p>
      <div className="overflow-x-auto w-full">
        <table className="table table-sm table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Address Owner
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                First name
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Last name
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Student ID
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Issue By
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Issue Date
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Certificate Name
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Address User
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                Access
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                End Time
              </th>
              <th className="bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                File
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log("Shared Data", sharedData)}
            {sharedData.map((item, index) => (
              <tr key={index} className="hover">
                <td className="text-xs">{item.studentAddress}</td>
                <td className="text-sm">{item.firstName}</td>
                <td className="text-sm">{item.lastName}</td>
                <td className="text-sm">{item.studentId}</td>
                <td className="text-sm">{item.issueBy}</td>
                <td className="text-sm">{item.issueDate}</td>
                <td className="text-sm">{item.certificateName}</td>
                <td className="text-xs">{item.user}</td>
                <td className="text-sm">{item.access ? "true" : "false"}</td>
                <td className="text-xs">
                  {item.endTime ? unixTimestampToDate(item.endTime) : "N/A"}
                </td>
                <td className="text-sm">
                  {item.imageUrl ? (
                    <button
                      className="btn"
                      onClick={() => openModal(item.imageUrl)}
                    >
                      View Image
                    </button>
                  ) : (
                    "No Image Link"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="image_modal" className="modal modal-bottom sm:modal-middle">
        <div
          className="modal-box"
          style={{ width: "90%", maxWidth: "1200px", height: "auto" }}
        >
          <h3 className="font-bold text-lg">Certificate File</h3>
          {modalImage &&
            (modalImage.endsWith(".pdf") ? (
              <iframe
                src={modalImage}
                title="PDF Viewer"
                className="w-full h-96"
                style={{ border: "none" }}
              ></iframe>
            ) : (
              <img
                src={modalImage}
                alt="Certificate"
                className="w-1/2 h-auto mx-auto"
              />
            ))}
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Display;

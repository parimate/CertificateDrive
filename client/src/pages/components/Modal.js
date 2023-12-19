// การสร้าง Modal component ที่ใช้สำหรับแสดงหน้าต่างแบบโมดอลเพื่อทำการแชร์ข้อมูลให้กับผู้ใช้งานอื่น ๆ
import { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
   // สร้าง state สำหรับจัดเก็บข้อมูลเวลา
  const [endTime, setEndTime] = useState("");
  // ฟังก์ชัน sharing ทำหน้าที่เมื่อผู้ใช้กดปุ่ม Share ใน Modal
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    // เรียกใช้ฟังก์ชัน allow ในสัญญาอัจฉริยะเพื่ออนุญาตให้ที่อยู่ที่ระบุมีสิทธิ์เข้าถึงข้อมูลและเวลา
    await contract.allow(address,endTime);
    // ปิด Modal เมื่อการแชร์ข้อมูลเสร็จสิ้น
    setModalOpen(false);
  };

  useEffect(() => {
    // ฟังก์ชัน accessList ทำหน้าที่เรียกใช้ฟังก์ชัน shareAccess ในสัญญาอัจฉริยะเพื่อดึงรายชื่อที่อยู่ที่มีสิทธิ์เข้าถึงข้อมูล
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      // สร้างตัวเลือกในรายการเลือกและเพิ่มรายชื่อที่อยู่ที่มีสิทธิ์เข้าถึงข้อมูลในรายการ
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    // เรียกใช้ฟังก์ชัน accessList เมื่อสัญญาอัจฉริยะพร้อมใช้งาน
    contract && accessList();
  }, [contract]);

  return (
    <>
      {/* ส่วนของหน้าต่างโมดอล */}
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">

            {/* กล่องข้อความในการระบุที่อยู่ที่ต้องการแชร์ข้อมูล */}
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>

            {/* กล่องข้อความในการระบุเวลา (endTime) */}
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="Enter End Time (second)"
            ></input>

          </div>
          <form id="myForm">
            {/* เลือกรายชื่อที่อยู่ที่มีสิทธิ์เข้าถึงข้อมูล */}
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            {/* ปุ่มยกเลิกเพื่อปิดหน้าต่างโมดอล */}
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            {/* ปุ่ม Share เพื่อทำการแชร์ข้อมูล */}
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

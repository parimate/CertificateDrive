import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SharingCertificate = ({ contract }) => {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        navigate('/page/home');
    };

    // สร้าง state สำหรับจัดเก็บข้อมูลเวลา
    const [endTime, setEndTime] = useState("");
    // ฟังก์ชัน sharing ทำหน้าที่เมื่อผู้ใช้กดปุ่ม Share ใน Modal
    const sharing = async () => {
        const address = document.getElementById("address").value;
        // เรียกใช้ฟังก์ชัน allow ในสัญญาอัจฉริยะเพื่ออนุญาตให้ที่อยู่ที่ระบุมีสิทธิ์เข้าถึงข้อมูลและเวลา
        await contract.allow(address, endTime);
    };

    useEffect(() => {
        // ฟังก์ชัน accessList ทำหน้าที่เรียกใช้ฟังก์ชัน shareAccess ในสัญญาอัจฉริยะเพื่อดึงรายชื่อที่อยู่ที่มีสิทธิ์เข้าถึงข้อมูล
        const accessList = async () => {
            const addressList = await contract.shareAccess();
            // สร้างตัวเลือกในรายการเลือกและเพิ่มรายชื่อที่อยู่ที่มีสิทธิ์เข้าถึงข้อมูลในรายการ
            let select = document.querySelector("#selectNumber");// แก้ไขการเลือก element จาก class เป็น id
            if (select) {
                const options = addressList;
                for (let i = 0; i < options.length; i++) {
                    let opt = options[i];
                    let e1 = document.createElement("option");
                    e1.textContent = opt;
                    e1.value = opt;
                    select.appendChild(e1);
                }
            } else {
                console.error("Element with id 'selectNumber' not found in DOM");
            }
        };
        // เรียกใช้ฟังก์ชัน accessList เมื่อสัญญาอัจฉริยะพร้อมใช้งาน
        contract && accessList();
    }, [contract]);

    return (
        <>
            <div className="flex flex-col justify-top items-center h-screen bg-base-100 mt-4">
                <h1 className="text-3xl font-bold mt-16 mb-4">Share Certificate With</h1>
                <div className="rounded-box w-80 p-4">
                    <label htmlFor="address" className="block mb-2 font-semibold">Address Viewer</label>
                    <input
                        id="address"
                        type="text"
                        className="border border-gray-300 p-2 mb-2 block w-full rounded-md"
                        placeholder="Input Address"
                    />
                    <label htmlFor="text2" className="block mb-2 font-semibold">End Time</label>
                    <input
                        id="endtime"
                        type="text"
                        value={endTime}
                        className="border border-gray-300 p-2 block w-full rounded-md"
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="Input End Time (second)"
                    />
                    <br></br>
                    <br></br>
                    <div className="flex justify-between">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => sharing()}>
                            Share
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SharingCertificate
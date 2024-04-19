import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SharingCertificate = ({ contract }) => {
    const navigate = useNavigate();
    // สร้าง state สำหรับจัดเก็บข้อมูลเวลา
    const [endTime, setEndTime] = useState("");

    const handleCancelClick = () => {
        navigate('/page/home');
    };

    // ฟังก์ชัน sharing ทำหน้าที่เมื่อผู้ใช้กดปุ่ม Share ใน Modal
    const sharing = async () => {
        const address = document.getElementById("address").value;
        // เรียกใช้ฟังก์ชัน allow ในสัญญาอัจฉริยะเพื่ออนุญาตให้ที่อยู่ที่ระบุมีสิทธิ์เข้าถึงข้อมูลและเวลา
        if (address && endTime) {
            await contract.allow(address, endTime);
        } else {
            console.error("Address or endTime is missing.");
        }
    };


    // useEffect สำหรับดึงรายชื่อที่มีสิทธิ์เข้าถึงข้อมูลเมื่อสัญญาอัจฉริยะพร้อมใช้งาน
    useEffect(() => {
        const accessList = async () => {
            if (contract) {
                try {
                    const addressList = await contract.shareAccess();
                    const select = document.querySelector("#selectNumber");

                    // สร้างตัวเลือกในรายการเลือกและเพิ่มรายชื่อที่อยู่ที่มีสิทธิ์เข้าถึงข้อมูลในรายการ
                    if (select) {
                        select.innerHTML = ""; // เคลียร์ตัวเลือกที่มีอยู่ก่อนหน้า
                        addressList.forEach((opt) => {
                            let option = document.createElement("option");
                            option.textContent = opt;
                            option.value = opt;
                            select.appendChild(option);
                        });
                    } else {
                        console.error("Element with id 'selectNumber' not found in DOM");
                    }
                } catch (error) {
                    console.error("Error fetching address list:", error.message);
                }
            }
        };

        // เรียกใช้งานฟังก์ชัน accessList เมื่อ contract พร้อมใช้งาน
        contract && accessList();
    }, [contract]);

    return (
        <>
            <div className="flex flex-col justify-top items-center h-screen bg-base-100 mt-4">
                <h1 className="text-3xl font-bold mt-14 mb-4">Share Certificate With</h1>
                <div className="rounded-box w-80 p-4">
                    <label htmlFor="address" className="block mb-2 font-semibold">Address Viewer</label>
                    <input
                        id="address"
                        type="text"
                        className="border border-gray-300 p-2 mb-2 block w-full rounded-md"
                        placeholder="Input Address"
                    />
                    <label htmlFor="endtime" className="block mb-2 font-semibold">End Time</label>
                    <input
                        id="endtime"
                        type="text" 
                        value={endTime} // ใช้ค่าจาก state endTime
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="Input End Time (second)"
                        className="border border-gray-300 p-2 block w-full rounded-md"
                    />

                    <label htmlFor="datetime" className="block mt-2 mb-2 font-semibold">Date and Time</label>
                    <input
                        id="datetime"
                        type="datetime-local"  // ใช้ type datetime-local เพื่อให้ผู้ใช้กรอกวันที่และเวลา
                        value={endTime}  // ใช้ค่าจาก state endTime
                        onChange={(e) => setEndTime(new Date(e.target.value).getTime() / 1000)}  // แปลงวันที่และเวลาเป็น Unix Timestamp (วินาที)
                        className="border border-gray-300 p-2 block w-full rounded-md"
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
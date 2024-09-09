import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SharingCertificate = ({ contract }) => {
    const navigate = useNavigate();
    const [address, setAddress] = useState(""); // เก็บค่าที่อยู่
    const [endTime, setEndTime] = useState(""); // เก็บค่าเวลาสิ้นสุด

    // ฟังก์ชันเมื่อคลิกปุ่ม "Cancel" เพื่อกลับไปหน้าหลัก
    const handleCancelClick = () => {
        navigate('/page/home');
    };

    // ฟังก์ชันทำหน้าที่เมื่อคลิกปุ่ม "Share" เพื่อแชร์ข้อมูล
    const sharing = async () => {
        if (address && endTime) {
            try {
                // จับเวลาการเริ่มต้นทำธุรกรรม
                const txStartTime = Date.now();
    
                // เรียกใช้งานสัญญาอัจฉริยะเพื่ออนุญาตการเข้าถึงข้อมูล
                await contract.allow(address, endTime);
    
                // จับเวลาสิ้นสุดการทำธุรกรรม
                const txEndTime = Date.now();
    
                // คำนวณระยะเวลาที่ใช้ในการทำธุรกรรม
                const transactionDuration = (txEndTime - txStartTime) / 1000;
                console.log(`Transaction completed in ${transactionDuration} seconds.`);
    
                alert(`Transaction completed in ${transactionDuration} seconds.`);
            } catch (error) {
                console.error("Error allowing access:", error);
                alert(`Error occurred while processing the transaction: ${error.message}`)
            }
        } else {
            console.error("Address or endTime is missing.");
            alert("Please provide both Address and End Time to proceed.");
        }
    };

    // ฟังก์ชันทำหน้าที่เมื่อคลิกปุ่ม "Disallow" เพื่อยกเลิกการแชร์ข้อมูล
    const disallow = async () => {
        if (address) {
            try {
                // จับเวลาการเริ่มต้นทำธุรกรรม
                const txStartTime = Date.now();
    
                // เรียกใช้งานสัญญาอัจฉริยะเพื่อยกเลิกการเข้าถึงข้อมูล
                await contract.disallow(address);
    
                // จับเวลาสิ้นสุดการทำธุรกรรม
                const txEndTime = Date.now();
    
                // คำนวณระยะเวลาที่ใช้ในการทำธุรกรรม
                const transactionDuration = (txEndTime - txStartTime) / 1000;
                console.log(`Transaction completed in ${transactionDuration} seconds.`);
    
                alert(`Transaction completed in ${transactionDuration} seconds.`);
            } catch (error) {
                console.error("Error disallowing access:", error);
                alert(`Error occurred while processing the disallow transaction: ${error.message}`);
            }
        } else {
            console.error("Address is missing.");
            alert("Please provide the Address to proceed.");
        }
    };

    return (
        <div className="flex flex-col justify-top items-center h-screen bg-base-100 mt-4">
            <h1 className="text-3xl font-bold mt-14 mb-4">Share Certificate With</h1>
            <div className="rounded-box w-80 p-4">
                {/* ฟิลด์กรอกที่อยู่ */}
                <label htmlFor="address" className="block mb-2 font-semibold">Address Viewer</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 p-2 mb-2 block w-full rounded-md"
                    placeholder="Input Address"
                />
            
                {/* ฟิลด์กรอกวันที่และเวลา */}
                <label htmlFor="datetime" className="block mt-2 mb-2 font-semibold">Date and Time</label>
                <input
                    id="datetime"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(new Date(e.target.value).getTime() / 1000)}
                    className="border border-gray-300 p-2 block w-full rounded-md"
                />

                 {/* ฟิลด์กรอกเวลาสิ้นสุด */}
                 <label htmlFor="endtime" className="block mt-2 mb-2 font-semibold">End Time</label>
                 <p
                    id="endtime"
                    className="border border-gray-300 p-2 block w-full rounded-md"
                >
                    {endTime ? endTime : "N/A"}
                </p>


                 <p
                    id="endtime"
                    className="border border-gray-300 p-2 block w-full rounded-md"
                >
                    {endTime ? new Date(endTime * 1000).toLocaleString() : "N/A"}
                </p>


                <br></br>
                <br></br>
                {/* ปุ่มสำหรับแชร์ข้อมูล */}
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => sharing()}>
                        Allow
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded" onClick={() => disallow()}>
                        Disallow
                    </button>
                    
                    {/* ปุ่มสำหรับยกเลิกการแชร์ */}
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SharingCertificate;

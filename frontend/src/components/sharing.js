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
            // เรียกใช้งานสัญญาอัจฉริยะเพื่ออนุญาตการเข้าถึงข้อมูล
            await contract.allow(address, endTime);
        } else {
            console.error("Address or endTime is missing.");
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
                {/* ฟิลด์กรอกเวลาสิ้นสุด */}
                <label htmlFor="endtime" className="block mb-2 font-semibold">End Time</label>
                <input
                    id="endtime"
                    type="text" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-gray-300 p-2 block w-full rounded-md"
                    placeholder="Input End Time (second)"
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

                <br></br>
                <br></br>
                {/* ปุ่มสำหรับแชร์ข้อมูล */}
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => sharing()}>
                        Share
                    </button>
                    {/* ปุ่มสำหรับยกเลิกการแชร์ */}
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SharingCertificate;

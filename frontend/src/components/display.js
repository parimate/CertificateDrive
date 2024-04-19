import React, { useState, useEffect, useCallback } from "react";


function Display({ contract }) {
    // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
    const [sharedData, setSharedData] = useState([]);
    const [Timestamp, setTimestamp] = useState(null);

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



    return (
        <>
            <br />
            <h1 className="text-2xl font-bold text-center">Certificate list</h1>
            <p className="text-1xl text-center mb-4 mt-2">Block Timestamp: Unix:{Timestamp} , Date:{unixTimestampToDate(Timestamp)}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Address Owner</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Student ID</th>
                            <th>Faculty</th>
                            <th>Department</th>
                            <th>Certificate Name</th>
                            <th>Address User</th>
                            <th>Access</th>
                            <th>End Time</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log('Shared Data', sharedData)}
                        {sharedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.studentAddress}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.studentId}</td>
                                <td>{item.faculty}</td>
                                <td>{item.department}</td>
                                <td>{item.certificateName}</td>
                                <td>{item.user}</td>
                                <td>{item.access ? "true" : "false"}</td>
                                {/* <td>{item.endTime?.toString()}</td> */}
                                <td>{item.endTime ? unixTimestampToDate(item.endTime) : 'N/A'}</td>
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
                </table>
            </div>
        </>
    );
}

export default Display;
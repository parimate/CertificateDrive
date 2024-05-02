import React, { useState, useEffect, useCallback } from "react";


function ViewCertificate({ contract, account }) {
    // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
    const [data, setData] = useState([]);
    const [Timestamp, setTimestamp] = useState(null);

    // ฟังก์ชันเพื่อดึงข้อมูลภาพจาก contract
    const getdata = async () => {
        await fetchCurrentTimestamp();
        let dataArray = [];

        // ดึงค่าที่อยู่ที่ต้องการดึงภาพ
        const Otheraddress = document.querySelector(".address").value;

        try {
            if (Otheraddress) {
                // เรียกใช้งานฟังก์ชัน display ใน contract และส่งที่อยู่ที่ต้องการดึงภาพเข้าไป
                dataArray = await contract.display(Otheraddress);
                console.log("dataArray:", dataArray);
                setData(dataArray);
                //  AppData.setData(dataArray)
            } else {
                // ถ้าไม่ได้ใส่ที่อยู่ ให้ดึงภาพของบัญชีปัจจุบัน (account)
                dataArray = await contract.display(account);
                console.log("dataArray:", dataArray);
                setData(dataArray);
                //AppData.setData(dataArray)

            }
        } catch (e) {
            // แสดงข้อความแจ้งเตือนในกรณีที่ไม่สามารถดึงภาพได้
            alert("You don't have access");
            fetchCurrentTimestamp();
            return;
        }

        // ตรวจสอบว่า dataArray ไม่ใช่ array หรือว่างเปล่า
        const isEmpty = !Array.isArray(dataArray) || dataArray.length === 0;

        // ถ้า dataArray ไม่ว่างเปล่า
        if (!isEmpty) {
            // ตรวจสอบเวลาของแต่ละรายการใน dataArray
            const filteredData = dataArray.filter(item => {
                const itemEndTime = parseInt(item.endTime, 10); // ประมวลผลค่า end time ให้เหมือนกันกับ Timestamp  แปลงเป็นเลขฐาน 10
                return Timestamp < itemEndTime; // ถ้า Timestamp มากกว่าหรือเท่ากับ end time ข้อมูลนี้ไม่ควรแสดง
            });

            if (filteredData.length > 0) {
                setData(
                    <table className="table">
                        <thead>
                            <tr>
                                <th>OwnerAddress</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Student ID</th>
                                <th>Faculty</th>
                                <th>Department</th>
                                <th>Certificate Name</th>
                                <th>End Time</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.studentAddress}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.studentId}</td>
                                    <td>{item.faculty}</td>
                                    <td>{item.department}</td>
                                    <td>{item.certificateName}</td>
                                    <td>{unixTimestampToDate(item.endTime)}</td>
                                    {/* <td>{item.endTime.toString()}</td> */}
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
                );
            } else {
                setData(<div>No eligible data to display</div>)
                alert("No eligible data to display");
            }
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

    // เมื่อ component ถูกโหลดหรือ state ที่เกี่ยวข้องมีการเปลี่ยนแปลง
    useEffect(() => {
        fetchCurrentTimestamp();
    }, [contract, fetchCurrentTimestamp]);

    return (
        <>
            <div class="mt-6 mb-4 mx-auto max-w-lg sm:mx-4 sm:max-w-none flex flex-col items-center">
                <h1 class="text-2xl font-bold text-black text-center">Certificate Display</h1>
                <p class="mt-3 text-center">Block Timestamp: Unix:{Timestamp}, Date:{unixTimestampToDate(Timestamp)}</p>
                <div class="mt-6">{data}</div>
                <br />
                <label for="addressInput" class="block text-center font-semibold mb-2">Enter the address of the certificate owner</label>
                <input
                    type="text"
                    placeholder="Enter Address"
                    class="text-center address border-2 border-gray-300 rounded-md px-4 py-2 w-full max-w-md"
                ></input>
                <br /> 
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getdata}>Get Data</button><br />
            </div>

        </>
    );
}

export default ViewCertificate
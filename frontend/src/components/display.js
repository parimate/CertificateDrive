import React, { useState, useEffect, useCallback, useContext } from "react";
//import { AppContext } from "../AppContext";

function Display({ contract, account }) {
    // กำหนด state สำหรับเก็บข้อมูลภาพที่ได้รับจาก contract
    //const AppData = useContext(AppContext);
    //const data= AppData.data;
    //const setData = AppData.setData;
    //const sharedData = AppData.sharedData;
    //const setSharedData = AppData.setSharedData;
    const [data, setData] = useState([]);
    const [sharedData, setSharedData] = useState([]);
    const [Timestamp, setTimestamp] = useState(null);
    //console.log('App Data', AppData)

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
            <br />
            <h1 className="text-2xl font-bold text-center mb-4">Certificate list</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
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
            <br /><br /><br />
            <h1 style={{ color: "black" }}>Certificate Display</h1>
            <p>Block Timestamp: Unix:{Timestamp} , Date:{unixTimestampToDate(Timestamp)}</p>
            <div className="shared-data">{data}</div>
            <br />
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
            ></input>
            <br />
            <button as="input" type="submit" value="Get Data" onClick={getdata} />
            {/* <button className="center button" onClick={getdata}>Get Data</button><br /> */}
            <br />
            <br />
        </>
    );
}

export default Display;

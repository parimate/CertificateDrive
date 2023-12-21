// SPDX-License-Identifier: GPL-3.0
// เลขที่ใบอนุญาต: GPL-3.0

pragma solidity >=0.8.0 <0.10.0; // เลือกเวอร์ชันของ Solidity ที่อยู่ในช่วง 0.8.0 ถึง 0.10.0

contract Upload {
    // สร้างโครงสร้าง Access ที่ใช้ในการเก็บข้อมูลการเข้าถึงของผู้ใช้
    struct Access {
        string firstName; // ข้อมูลชื่อ
        string lastName; //นามสกุล
        string studentId; // ข้อมูลรหัสนักศึกษา
        string faculty; // คณะ
        string department; // ภาควิชา
        string certificateName; // ชื่อใบประกาศณีบัตร
        address user; // ที่อยู่ของผู้ใช้
        bool access; // สถานะการเข้าถึง (true หมายถึงมีสิทธิ์เข้าถึง, false หมายถึงไม่มีสิทธิ์เข้าถึง)
        uint256 endTime; // เวลาสิ้นสุดที่ผู้ใช้สามารถเข้าถึงได้
    }

    mapping(address => string[]) value; // แม็พของรายการ URL ที่ผู้ใช้เพิ่มเข้าไป
    mapping(address => mapping(address => bool)) ownership; // แม็พของสิทธิ์การเปิดเผยข้อมูลระหว่างผู้ใช้
    mapping(address => Access[]) accessList; // แม็พของรายการการเข้าถึงข้อมูลระหว่างผู้ใช้
    mapping(address => mapping(address => bool)) previousData; // แม็พของสถานะก่อนหน้าของข้อมูลระหว่างผู้ใช้
    


    // ฟังก์ชันเพิ่ม URL ของผู้ใช้
    function add(
        string memory _firstName,
        string memory _lastName,
        string memory _studentId,
        string memory _faculty,
        string memory _department,
        string memory _certificateName,
        address _user,
        uint256 _endTime,
        string memory url

    ) external {
        // เพิ่มรายการการเข้าถึงข้อมูลใหม่เข้าไปใน accessList
        accessList[_user].push(
            Access(
                _firstName,
                _lastName,
                _studentId,
                _faculty,
                _department,
                _certificateName,
                msg.sender,
                true,
                _endTime
            )
        );
        value[_user].push(url);        
    }

    // ฟังก์ชันอนุญาตให้ผู้ใช้รายอื่นเข้าถึงข้อมูล
    function allow(address user, uint256 endTime) external {
        ownership[msg.sender][user] = true; // ตั้งค่าสิทธิ์ให้กับผู้ใช้ที่ระบุเพื่อเปิดเผยข้อมูล
        if (previousData[msg.sender][user]) {
            // ถ้ามีการเข้าถึงข้อมูลก่อนหน้านี้ ให้อัปเดตสถานะการเข้าถึงให้เป็น true
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                    accessList[msg.sender][i].endTime = endTime + block.timestamp; // อัปเดตเวลาสิ้นสุด
                }
            }
        } else {
            // ถ้าไม่เคยมีการเข้าถึงข้อมูลก่อนหน้านี้ ให้เพิ่มรายการการเข้าถึงใหม่และตั้งค่าสถานะก่อนหน้าเป็น true
            accessList[msg.sender].push(
                Access("","","","","","",user,true,endTime + block.timestamp)
            );
            previousData[msg.sender][user] = true;
        }
    }

    // ฟังก์ชันไม่อนุญาตให้ผู้ใช้รายอื่นเข้าถึงข้อมูล
    function disallow(address user) external {
        ownership[msg.sender][user] = false; // ยกเลิกสิทธิ์การเปิดเผยข้อมูลของผู้ใช้ที่ระบุ
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            // อัปเดตสถานะการเข้าถึงเป็น false สำหรับผู้ใช้ที่ระบุ
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    // ฟังก์ชันแสดงรายการ URL และข้อมูลอื่นๆ ของผู้ใช้
    function display(address _user) external view returns (string[] memory, Access memory){
        // ตรวจสอบว่าผู้ใช้เป็นเจ้าของหรือมีสิทธิ์ในการเข้าถึงข้อมูล หากไม่ใช่จะโยนข้อผิดพลาด
        require(_user == msg.sender || ownership[_user][msg.sender],"You don't have access");

        // ตรวจสอบว่าผู้ใช้เรียกดู URL ในระยะเวลาที่สามารถเข้าถึงได้
        uint256 currentTime = block.timestamp;
        for (uint256 i = 0; i < accessList[_user].length; i++) {
            if (
                accessList[_user][i].user == msg.sender &&
                accessList[_user][i].access &&
                accessList[_user][i].endTime >= currentTime
            ) {
                // ผู้ใช้มีสิทธิ์และเวลาการเข้าถึงยังไม่สิ้นสุด
                return (value[_user], accessList[_user][i]);
            }
        }

        // ถ้าไม่มีสิทธิ์หรือเวลาการเข้าถึงสิ้นสุดแล้ว
        revert("You don't have access");
    }

    // ฟังก์ชันแสดงรายการการเข้าถึงข้อมูลของผู้ใช้เอง
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function getCurrentTimestamp() public view returns (uint256) {
        uint256 currentTimestamp = block.timestamp;
        return currentTimestamp;
    }
}

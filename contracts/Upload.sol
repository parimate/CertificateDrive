// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract Upload {
    // สร้างโครงสร้าง Access ที่ใช้ในการเก็บข้อมูลการเข้าถึงของผู้ใช้
    struct Access {
        address studentAddress; // Address นักศึกษา
        string firstName; // ข้อมูลชื่อ
        string lastName; //นามสกุล
        string studentId; // ข้อมูลรหัสนักศึกษา
        string faculty; // คณะ
        string department; // ภาควิชา
        string certificateName; // ชื่อใบประกาศณีบัตร
        address user; // ที่อยู่ของผู้ใช้
        bool access; // สถานะการเข้าถึง (true หมายถึงมีสิทธิ์เข้าถึง, false หมายถึงไม่มีสิทธิ์เข้าถึง)
        uint256 endTime; // เวลาสิ้นสุดที่ผู้ใช้สามารถเข้าถึงได้
        string imageUrl; //URL ของรูปภาพ
    }

    mapping(address => string[]) value; // แม็พของรายการ URL ที่ผู้ใช้เพิ่มเข้าไป
    mapping(address => Access[]) accessList; // แม็พของรายการการเข้าถึงข้อมูลระหว่างผู้ใช้
    mapping(address => mapping(address => bool)) previousData; // แม็พของสถานะก่อนหน้าของข้อมูลระหว่างผู้ใช้
    mapping(address => mapping(address => bool)) ownership; // แม็พของสิทธิ์การเปิดเผยข้อมูลระหว่างผู้ใช้

    mapping(address => bool) private authorizedIssuers; // รายชื่อผู้ที่มีสิทธิ์ในการออกใบประกาศนียบัตร
    mapping(address => bool) private authorizedViewers; // รายชื่อผู้ที่มีสิทธิ์ในการดูข้อมูลใบประกาศนียบัตร
    mapping(address => bool) private authorizedStudent; // รายชื่อนักศึกษาเจ้าของใบประกาศนียบัตร

    constructor() {
        authorizedIssuers[msg.sender] = true; // Contract creator is the initial admin
    }

    modifier onlyAuthorizedIssuer() {
        require(
            authorizedIssuers[msg.sender],
            "Only authorized issuers can call this function"
        );
        _;
    }

    modifier onlyAuthorizedViewer() {
        require(
            authorizedViewers[msg.sender],
            "Only authorized viewers can call this function"
        );
        _;
    }

    modifier onlyStudent() {
        require(
            authorizedStudent[msg.sender],
            "Only student can call this function"
        );
        _;
    }

    // ฟังก์ชันเพิ่ม URL ของผู้ใช้
    function add(
        address _studentAddress,
        string memory _firstName,
        string memory _lastName,
        string memory _studentId,
        string memory _faculty,
        string memory _department,
        string memory _certificateName,
        address _user,
        uint256 _endTime,
        string memory _imageUrl
    ) external {
        authorizedStudent[_studentAddress] = true;
        authorizedIssuers[_user] = true;
        // เพิ่มรายการการเข้าถึงข้อมูลใหม่เข้าไปใน accessList
        accessList[_studentAddress].push(
            Access(
                _studentAddress,
                _firstName,
                _lastName,
                _studentId,
                _faculty,
                _department,
                _certificateName,
                msg.sender,
                true,
                _endTime,
                _imageUrl
            )
        );
        accessList[_user].push(
            Access(
                _studentAddress,
                _firstName,
                _lastName,
                _studentId,
                _faculty,
                _department,
                _certificateName,
                msg.sender,
                true,
                _endTime,
                _imageUrl
            )
        );
    }

    // ฟังก์ชันอนุญาตให้ผู้ใช้รายอื่นเข้าถึงข้อมูล
    function allow(address user, uint256 endTime) external {
        ownership[msg.sender][user] = true; // ตั้งค่าสิทธิ์ให้กับผู้ใช้ที่ระบุเพื่อเปิดเผยข้อมูล
        authorizedViewers[user] = true;
        // ถ้ามีการเข้าถึงข้อมูลก่อนหน้านี้ ให้อัปเดตสถานะการเข้าถึงให้เป็น true
        if (previousData[msg.sender][user]) {
            for (uint256 i = 0; i <= accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                    accessList[msg.sender][i].endTime = endTime; // อัปเดตเวลาสิ้นสุด
                }
            }
        } else {
            // ถ้าไม่เคยมีการเข้าถึงข้อมูลก่อนหน้านี้ ให้เพิ่มรายการการเข้าถึงใหม่และตั้งค่าสถานะก่อนหน้าเป็น true
            Access memory newAccess = Access(
                accessList[msg.sender][0].studentAddress,
                accessList[msg.sender][0].firstName,
                accessList[msg.sender][0].lastName,
                accessList[msg.sender][0].studentId,
                accessList[msg.sender][0].faculty,
                accessList[msg.sender][0].department,
                accessList[msg.sender][0].certificateName,
                user,
                true,
                endTime,
                accessList[msg.sender][0].imageUrl
            );
            accessList[msg.sender].push(newAccess);
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

    // ฟังก์ชันแสดงรายการ URL และข้อมูลอื่น ๆ ของผู้ใช้
    function display(address userToDisplay) external view returns (Access[] memory){
        // ตรวจสอบว่าผู้เรียกฟังก์ชันได้รับอนุญาติในการดูข้อมูล
        require(
            authorizedViewers[msg.sender] || authorizedStudent[msg.sender],
            "You don't have access"
        );

        // ตรวจสอบว่า address userToDisplay ได้รับอนุญาติในการดูข้อมูลหรือไม่
        require(
            ownership[msg.sender][userToDisplay] ||
                authorizedStudent[userToDisplay],
            "User is not authorized to view data"
        );

        // สร้างตัวแปรเพื่อเก็บรายการ Access ที่มี endTime มากกว่า 0
        Access[] memory validAccessList = new Access[](
            accessList[userToDisplay].length
        );
        uint256 validAccessCount = 0;

        // วนลูปเพื่อกรองรายการที่มี endTime มากกว่า 0
        for (uint256 i = 0; i < accessList[userToDisplay].length; i++) {
            if (accessList[userToDisplay][i].endTime > 0) {
                validAccessList[validAccessCount] = accessList[userToDisplay][
                    i
                ];
                validAccessCount++;
            }
        }

        // ปรับขนาดของ validAccessList ให้ตรงกับจำนวนที่มี endTime มากกว่า 0
        assembly {
            mstore(validAccessList, validAccessCount)
        }

        return validAccessList;
    }

    // ฟังก์ชันแสดงรายการการเข้าถึงข้อมูลของผู้ใช้เอง
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
}

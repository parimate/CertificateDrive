import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Home from './pages/home';
import Share from './pages/share';
import UploadPage from './pages/UploadPage';
import View from './pages/View';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Provider } from "./AppContext";


function App() {

  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [mmm, setProvider] = useState(null);

  

  // useEffect ทำงานเมื่อ component ถูกสร้างขึ้น (เมื่อโหลดหน้า App)
  useEffect(() => {
    // สร้าง provider จาก ethers.providers.Web3Provider โดยใช้ window.ethereum
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) { // ตรวจสอบว่า provider มีค่าหรือไม่
        // ตั้งค่า event listener สำหรับตรวจสอบการเปลี่ยนแปลง network และ account
        window.ethereum.on("chainChanged", () => {
          window.location.reload(); // รีโหลดหน้าเว็บเมื่อเปลี่ยนเครือข่าย
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload(); // รีโหลดหน้าเว็บเมื่อมีการเปลี่ยนบัญชี
        });

        // ขอสิทธิ์ในการเข้าถึงบัญชีจาก metamask
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        // รับที่อยู่ของบัญชีปัจจุบัน
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address); // อัปเดต state account ด้วยที่อยู่บัญชีปัจจุบัน

        // กำหนดที่อยู่ของสัญญาอัจฉริยะ (Smart contract)
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        // สร้าง instance ของ contract ด้วย ethers.Contract
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        setContract(contract); // อัปเดต state contract ด้วย instance ของ contract ที่สร้างขึ้น
        setProvider(provider); // อัปเดต state provider ด้วย provider ที่สร้างขึ้น
      } else {
        console.error("Metamask is not installed"); // แสดงข้อความแจ้งเตือนในกรณีที่ไม่มี Metamask
      }
    };
    
    provider && loadProvider();
  }, []);

  // ส่วนการแสดงผลบนหน้าเว็บ
  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/pages/UploadPage">Upload</Nav.Link>
              <Nav.Link href="/pages/Share">Share</Nav.Link>
              <Nav.Link href="/pages/View">View</Nav.Link>
              <Nav.Link href="/pages/Revoke">Revoke</Nav.Link>
            </Nav>
            {/* แสดงข้อมูลบัญชีปัจจุบันที่เชื่อมต่อ */}
            <p style={{ color: "Orange" }}>
              Account : {account ? account : "Not connected"}
            </p>
          </Container>
        </Navbar>
        <Provider >
        <Routes>
          <Route path="/"  >
            <Route index element={<Home/>} />
            <Route path="pages/UploadPage" element={<UploadPage />} />
            <Route path="pages/Share" element={<Share />} />
            <Route path="pages/View" element={<View />} />
            <Route path="pages/Revoke" element={<View />} />
            <Route path="*" element={<div>No Match</div>} />
          </Route>
        </Routes>
        </Provider>
      </BrowserRouter>
      
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"; 
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Login from "./page/login";
import Home from "./page/home";
import UploadFile from "./page/uploadFile";
import OwnerDisplay from "./page/ownerDisplay";
import ViewerDisplay from "./page/viewerDisplay";
import SetSharing from "./page/setSharing";
import withAuth from './page/withAuth'; 

function App() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const admin = "0xDBE7cDFe2c8b3400694c2da0AE1B3D8F92a45374";
  const ProtectedUploadFile = withAuth(UploadFile, admin);

  //  // Smart contract address Localhost Network 
  //  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Smart contract address Sepolia Test Network
  const contractAddress = "0x7a2A3AC276220bddE5d9Fd77F4C87B485B58bd50";

  // // Smart contract address Amoy Test Network
  // const contractAddress = "0x0CACdD407D860597Daec41273c694807B8f94825";

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
  

  return (
    <>
      <div>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/page/login" element={<Login />} />
            <Route path="/page/home" element={<Home account={account} contract={contract} provider={provider} admin={admin} contractAddress={contractAddress}/>} />
            <Route path="/page/uploadFile" element={<ProtectedUploadFile account={account} contract={contract} provider={provider} admin={admin} contractAddress={contractAddress}/>} />
            <Route path="/page/ownerDisplay" element={<OwnerDisplay account={account} contract={contract} provider={provider} contractAddress={contractAddress}/>} />
            <Route path="/page/viewerDisplay" element={<ViewerDisplay account={account} contract={contract} provider={provider} contractAddress={contractAddress} />} />
            <Route path="/page/setSharing" element={<SetSharing account={account} contract={contract} provider={provider} contractAddress={contractAddress}/>} />
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
      </div>
    </>
  );
}

export default App;

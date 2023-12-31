import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Modal from "./components/Modal";
//import "./SharePage.css";

function Share() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        {/* Component FileUpload */}
        {/* ... (The rest of the FileUpload component code) */}

        {/* Component Display */}
        {/* ... (The rest of the Display component code) */}
      </div>




      <div className="App">
        <p>This is The Share Page</p>
        <Link to="/">Back to Home Page</Link>
      </div>
    </>
  )
}

export default Share;
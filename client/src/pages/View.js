import { Link } from 'react-router-dom'
import Display from './components/Display';
import { useState, useEffect , useContext } from "react";
import { ethers } from "ethers";
import { AppContext } from '../AppContext';

function View() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);


  const loadProvider = async () => {
   
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
      setContract(contract); // อัปเดต state contract ด้วย instance ของ contract ที่สร้างขึ้น
    
  };

 
 
  return (
    <>
      <div className="App">
        {/* Component Display ส่ง props ไปยัง Display component */}
        <Display contract={contract} account={account}></Display>
      </div>
      <div className="App">
        <p>This is The View Page</p>
        <Link to="/">Back to Home Page</Link>
      </div>
    </>
  )
}

export default View;
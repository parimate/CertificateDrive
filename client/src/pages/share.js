import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Modal from "./components/Modal";


function Share() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  // กำหนด state สำหรับเปิด/ปิด Modal
  const [modalOpen, setModalOpen] = useState(false);
 

  return (
    <>
      {/* เงื่อนไขทำให้ปุ่ม Share แสดงหรือซ่อนตามค่า state modalOpen */}
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      

        
      
      <div className="App">
        <p>This is The Share Page</p>
        <Link to="/">Back to Home Page</Link>
      </div>
    </>
  )
}

export default Share;
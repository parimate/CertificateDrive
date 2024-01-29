import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
//import "./SharePage.css";

function Share() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [contract, setContract] = useState(null);
   // กำหนด state สำหรับเปิด/ปิด Modal
  const [modalOpen, setModalOpen] = useState(false);






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
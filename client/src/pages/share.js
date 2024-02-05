import { Link } from 'react-router-dom'
import { useState } from "react";
import Modal from "./components/Modal";
//import "./SharePage.css";

function Share() {
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <>
      <div className="App">

        {/* Button to open the Modal */}
        <button onClick={() => setModalOpen(true)}>Open Modal</button>

        {/* Render the Modal component */}
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
          // Pass other props to the Modal component as needed
          />
        )}
        <br /><br/>
        <p>This is The Share Page</p>
        <Link to="/">Back to Home Page</Link>
      </div>
    </>
  )
}

export default Share;
import { Link } from 'react-router-dom'
import Display from './components/Display';
import { useState, useEffect } from "react";

function View() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
 
 

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
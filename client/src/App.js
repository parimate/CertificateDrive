import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {  Row, Col } from 'react-bootstrap';



function App() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  // กำหนด state สำหรับเปิด/ปิด Modal
  const [modalOpen, setModalOpen] = useState(false);

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
   
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/Home">DApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/pages/Home">Home</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
            <Nav.Link href="/share">Share</Nav.Link>
            <Nav.Link href="/view">View</Nav.Link>
          </Nav>
          {/* แสดงข้อมูลบัญชีปัจจุบันที่เชื่อมต่อ */}
          <p style={{ color: "Orange" }}>
            Account : {account ? account : "Not connected"}
          </p>
        </Container>
      </Navbar>
    

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
        <img src="https://www.fis.psu.ac.th/en/wp-content/uploads/2022/09/PSU-Logo-01.png" className="logo" alt="PSU logo" width="150" height="100" />
        <img src="https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/305618331_513148457478709_2689011196404496399_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=VoSufyKdqd4AX8OJLEw&_nc_ht=scontent-kul3-1.xx&oh=00_AfDij5tH-YZfoRvS6dahJ2VyKFfz1w2hupb9U3LlvtqgKg&oe=65780ED1"
          className="logo" alt="CoE logo" width="100" height="100" />
        <br />
        <h1 style={{ color: "black" }}>DApp Certificate Store</h1>
        
        <Container style={{ padding: 20, marginTop: 20 }}>
          <Row>
            <Col md={4}>
              <Card style={{ padding: 20, width: '20rem' }}>
                <br />
                <Card.Img variant="top" src="https://plus.unsplash.com/premium_photo-1661281234131-5a81d87a4d2a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Card.Body>
                  <Card.Title>Admin</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary" href="/Home">Login</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{ padding: 20, width: '20rem' }}>
                <br />
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Card.Body>
                  <Card.Title>Student</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary" href="/Home">Login</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{ padding: 20, width: '20rem' }}>
                <br />
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <Card.Body>
                  <Card.Title>Viewer</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary" href="/Home">Login</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>



        {/* Component FileUpload ส่ง props ไปยัง FileUpload component */}
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>

        {/* Component Display ส่ง props ไปยัง Display component */}
        <Display contract={contract} account={account}></Display>

        
      </div>

    </>
  );
}

export default App;

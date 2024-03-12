import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";


function Login() {
  // กำหนด state สำหรับเก็บข้อมูล account, contract และ provider
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/page/home");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
  };

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

  return (
    <>
      <div className="navbar bg-base-100 bg-primary">
        <div className="flex-1">
          <button className="btn btn-ghost text-xl">Decentralized Certificate Storage Application</button>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
          <button className="btn" onClick={handleLogin}>Connect Wallet</button>
          {/* <p className="btn" style={{ color: "Black" }} onClick={handleLogin}>
            Account : {account ? account : "Not connected"}
          </p> */}
        </div>
      </div>

      <div className="relative flex flex-col justify-center h-screen overflow-hidden" style={{ height: "90vh" }}>
        <div className="w-full p-8 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Login PSU Passport</h1>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Account Name</span>
              </label>
              <input type="text" placeholder="Account Name" className="w-full input input-bordered input-primary" />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter Password" className="w-full input input-bordered input-primary" />
            </div>
            <button className="text-xs text-gray-600 hover:underline hover:text-blue-600" onClick={handleForgotPassword}>Forget Password?</button>
            <div className="mx-auto">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </form>
          <div className="my-6 space-y-2">
            <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400" onClick={handleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
            <button aria-label="Login with GitHub" className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400" onClick={handleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <p>Login with GitHub</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

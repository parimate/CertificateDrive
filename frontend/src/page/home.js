import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

function Home() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/page/uploadpage');
  };

  const handleOwnerClick = () => {
    navigate('/page/ownerDisplay');
  };

  const handleViewerClick = () => {
    navigate('/page/viewerDisplay');
  };

  const handleSetPolicyClick = () =>{
    navigate('/page/setPolicy');
  }

  return (
    <>
      <Navbar />
      <br />
      <div className="flex justify-center space-x-12 mt-14">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">Admin</h2>
          <p>Issue a certificate</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleUploadClick}>Upload Certificate</button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://media.istockphoto.com/id/1173918120/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AB%E0%B8%A1%E0%B8%A7%E0%B8%81%E0%B8%9A%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B5%E0%B8%94%E0%B9%8D%E0%B8%B2%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%9E%E0%B8%B9%E0%B9%88%E0%B8%AA%E0%B8%B5%E0%B9%81%E0%B8%94%E0%B8%87%E0%B8%9A%E0%B8%B4%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%B5%E0%B8%9F%E0%B9%89%E0%B8%B2-tossed-%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B8%9A%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B8%B4%E0%B8%95%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2.jpg?s=612x612&w=0&k=20&c=1dSKUHbizPN2Uh6tuQ4-INEpdiZs0Y7dY-Vd0Iran1g=" 
          alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Owner</h2>
          <p>View your own certificates and set permissions for sharing certificate information.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleOwnerClick}>View Certificate</button>
            <button className="btn btn-primary" onClick={handleSetPolicyClick}>Set Policy</button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://media.istockphoto.com/id/1652922874/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%99%E0%B8%B8%E0%B8%A9%E0%B8%A2%E0%B9%8C%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AA%E0%B8%AD%E0%B8%9A-%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B9%84%E0%B8%A5.jpg?s=612x612&w=0&k=20&c=35K9h4A5wBtG3ManHuOo4zAU19halioPf_6iPzWCaH0="
         alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Viewer</h2>
          <p>View certificates authorized by the certificate owner.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleViewerClick}>View Certificate</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Home;
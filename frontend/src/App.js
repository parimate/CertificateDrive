import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./page/login";
import Home from "./page/home";
import UploadFile from "./page/uploadFile";
import OwnerDisplay from "./page/ownerDisplay";
import ViewerDisplay from "./page/ownerDisplay";
import SetPolicy from "./page/setPolicy";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/page/login" element={<Login />} />
          <Route path="/page/home" element={<Home />} />
          <Route path="/page/uploadFile" element={<UploadFile />} />
          <Route path="/page/ownerDisplay" element={<OwnerDisplay />} />
          <Route path="/page/viewerDisplay" element={<ViewerDisplay />} />
          <Route path="/page/setPolicy" element={<SetPolicy />} />
          <Route path="*" element={<div>No Match</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;

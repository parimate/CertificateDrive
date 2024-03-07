import React, { useState } from "react";
import Navbar from '../components/navbar';
import axios from "axios";

function UploadPage({ contract, account }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    faculty: "",
    department: "",
    certificateName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formDataUpload,
          headers: {
            pinata_api_key: `1017366b54483158e7bb`,
            pinata_secret_api_key: `e928f7d29be0a8ef84784d2af8a3925cdb2f5bcb961fd7b4e3193318d6bc7a2e`,
            "Content-Type": "multipart/form-data",
          },
        });

        const {
          studentId,
          faculty,
          department,
          certificateName,
        } = formData;

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        await contract.add(
          account,
          studentId,
          faculty,
          department,
          certificateName,
          ImgHash
        );

        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-7 max-w-2xl">
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          {/* ... (other form inputs) */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Student ID
            <input
              id="studentId"
              type="text"
              className="grow"
              placeholder="Input ID"
              value={formData.studentId}
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Faculty
            <input
              id="faculty"
              type="text"
              className="grow"
              placeholder="Input Faculty"
              value={formData.faculty}
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Department
            <input
              id="department"
              type="text"
              className="grow"
              placeholder="Input Department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            Certificate Name
            <input
              id="certificateName"
              type="text"
              className="grow"
              placeholder="Input CertificateName"
              value={formData.certificateName}
              onChange={handleChange}
            />
          </label>

          {/* File upload section */}
          <div className="mt-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Choose Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
              <span className="ml-3 textArea">Image: {fileName}</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
            noValidate
            validated={validated}
            onSubmit={handleSubmitForm}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadPage;

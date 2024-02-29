import React, { useState } from "react";
import Navbar from '../components/navbar';

function Upload() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    faculty: "",
    department: "",
    certificateName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      
      <div className="container mx-auto mt-5">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="StudentAddres" className="block text-sm font-medium text-gray-600">
              StudentAddres
            </label>
            <input
              type="text"
              id="certificateName"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-600">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-600">
              Faculty
            </label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="certificateName" className="block text-sm font-medium text-gray-600">
              Certificate Name
            </label>
            <input
              type="text"
              id="certificateName"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <input type="file" className="file-input file-input-bordered w-full max-w-xs" />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;

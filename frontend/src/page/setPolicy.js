import React from "react";
import Navbar from '../components/navbar';

function SetPolicy() {
  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-col justify-top items-center h-screen bg-base-100">
        <h1 className="text-3xl font-bold mb-4">Share Certificate With</h1>
        <div className="rounded-box w-80 p-4">
          <label htmlFor="text1" className="block mb-2 font-semibold">Address Viewer</label>
          <input
            id="text1"
            type="text"
            className="border border-gray-300 p-2 mb-2 block w-full rounded-md"
            placeholder="Input Address"
          />
          <label htmlFor="text2" className="block mb-2 font-semibold">End Time</label>
          <input
            id="text2"
            type="text"
            className="border border-gray-300 p-2 block w-full rounded-md"
            placeholder="Input End Time (sec)"
          />
          <br></br>
          <br></br>
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Share
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetPolicy;

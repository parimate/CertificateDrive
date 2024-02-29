import React from "react";
import Navbar from '../components/navbar';

function ViewerDisplay() {
    return (
        <>
            <Navbar />
            <br />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Student ID</th>
                            <th>Faculty</th>
                            <th>Department</th>
                            <th>Certificate Name</th>
                            <th>End Time</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>Satoshi</td>
                            <td>Nakamoto</td>
                            <td>000000000</td>
                            <td>Engineering</td>
                            <td>Computer Engineering</td>
                            <td>Bitcoin</td>
                            <td>0</td>
                            <td>View Certificate</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewerDisplay;

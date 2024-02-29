import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100 bg-primary">
                <div className="navbar-start">
                    <Link to="/page/home" className="btn btn-ghost text-xl">Decentralized Certificate Storage Application</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">User Address</a>
                </div>
            </div>
        </>
    )
}

export default Navbar
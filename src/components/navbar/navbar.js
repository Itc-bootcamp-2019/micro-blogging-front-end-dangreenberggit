import React from 'react';
import {
    Link,
  } from "react-router-dom";
  import './navbar-style.css';

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
        )
}

export default Navbar;
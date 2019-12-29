import React from 'react';
import {
    Link,
  } from "react-router-dom";
import './navbar-style.css';
import firebase from '../../config/fbconfig';
import SignInScreen from '../SignIn';

const Navbar = (props) => {
    const user = firebase.auth().currentUser;
    if (user) {
        let avatarURL = `url(${user.photoURL})`;
    } else {
        let avatarURL = "url('')";
    }

    return (
        <div className="navbar">
            <nav>
                {props.loggedIn &&
                    <ul className="nav-left">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                }
                <div className="nav-right">
                    <ul>
                        {props.loggedIn && (
                            <li className="logged-in">
                                <Link to="/profile">
                                    <div className ="user-profile">
                                       Profile
                                      
                                    </div>
                                </Link>
                            </li>
                        )}
                        <li className="logged-out">
                            <SignInScreen />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;
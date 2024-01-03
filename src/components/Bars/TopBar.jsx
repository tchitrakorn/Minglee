import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyEvent from "../MyEvent/MyEvent.jsx";

function TopBar(props) {
    return (
        <nav>
            <div class="menu-wrapper">
                <div class="menu-div">
                    <span>Welcome, {props.userName}!</span>
                    <div>
                        <span class="material-icons site-logo">
                            emoji_people
                        </span>{" "}
                        <span class="site-name">Minglee</span>
                    </div>
                    <div class="menu-right">
                        <div>
                            <Link to="/myevent">
                                <a>My Events</a>
                            </Link>
                        </div>
                        <div>
                            <Link to="/host">
                                <a>Host</a>
                            </Link>
                        </div>
                        <div>
                            <Link to="/">
                                <a>Join</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopBar;

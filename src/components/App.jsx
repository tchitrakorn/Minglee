import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Main from "./Main.jsx";
import HomeFeed from "./HomeFeed/HomeFeed.jsx";
import TopBar from "./Bars/TopBar.jsx";
import BottomBar from "./Bars/BottomBar.jsx";
import MyEvent from "./MyEvent/MyEvent.jsx";
import Host from "./Host/Host.jsx";
import Login from "./Login/Login.jsx";

const App = () => {
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");

    if (userId === "") {
        return (
            <div class="wrapper">
                <nav>
                    <div class="menu-wrapper">
                        <div class="menu-div">
                            <div class="auto-margin">
                                <span class="material-icons site-logo">
                                    emoji_people
                                </span>{" "}
                                <span class="site-name">mingly</span>
                            </div>
                        </div>
                    </div>
                </nav>
                <Login
                    mode={mode}
                    setUserId={setUserId}
                    setUserName={setUserName}
                />
                <div class="bottom-bar">- Made by Foz and Tattie 2021 -</div>
            </div>
        );
    }
    return (
        <div class="wrapper">
            <BrowserRouter>
                <TopBar userName={userName} />
                <Switch>
                    <Route exact path="/">
                        <HomeFeed userId={userId} />
                    </Route>
                    <Route path="/myevent">
                        <MyEvent userId={userId} userName={userName} />
                    </Route>
                    <Route path="/host">
                        <Host userId={userId} userName={userName} />
                    </Route>
                </Switch>
                <BottomBar />
            </BrowserRouter>
        </div>
    );
};

export default App;

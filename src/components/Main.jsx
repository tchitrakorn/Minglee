import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import HomeFeed from "./HomeFeed/HomeFeed.jsx";
import MyEvent from "./MyEvent/MyEvent.jsx";
import Host from "./Host/Host.jsx";
import TopBar from "./Bars/TopBar.jsx";
import BottomBar from "./Bars/BottomBar.jsx";
import Signup from "./Login/Signup.jsx";

function Main() {
    return (
        <div class="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomeFeed />}>
                        <Route path="/myevent" element={<MyEvent />} />
                        <Route path="/host" element={<Host />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Main;

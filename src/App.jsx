import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomeFeed from "./components/HomeFeed/HomeFeed.jsx";
import TopBar from "./components/Bars/TopBar.jsx";
import BottomBar from "./components/Bars/BottomBar.jsx";
import MyEvent from "./components/MyEvent/MyEvent.jsx";
import Host from "./components/Host/Host.jsx";
import Login from "./components/Login/Login.jsx";

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
        <div class="bottom-bar">- Made by Tattie -</div>
      </div>
    );
  }
  return (
    <div class="wrapper">
      <BrowserRouter>
        <TopBar userName={userName} />
        <Routes>
          <Route exact path="/" element={<HomeFeed userId={userId} />} />
          <Route path="/myevent" element={<MyEvent userId={userId} userName={userName} />} />
          <Route path="/host" element={<Host userId={userId} userName={userName} />} />
        </Routes>
        <BottomBar />
      </BrowserRouter>
    </div>
  );
};

export default App;
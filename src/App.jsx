/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */


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

/*
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeFeed />}>
          <Route path="myevent" element={<MyEvent />} />
          <Route path="Host" element={<Host />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
*/

/*
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeFeed />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); */


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
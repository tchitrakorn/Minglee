import React, { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./Signup.jsx";
import Main from "../Main.jsx";
import HomeFeed from "../HomeFeed/HomeFeed.jsx";

function Login(props) {
    const [mode, setMode] = useState(props.mode);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userId, setUserId] = useState('');

    if (mode === "signup") {
        return <Signup />;
    }

    if (mode === "home") {
        return <Main />;
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password,
        };
        axios
            .post("http://localhost:8080/login", data)
            .then((response) => {
                props.setUserId(response.data.userId);
                props.setUserName(response.data.firstname);
                setMode("home");
            })
            .catch((error) => {
                console.log("error: ", error);
                setMode("signup");
            });
    };

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        let data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        };
        axios
            .post("http://localhost:8080/signup", data)
            .then((response) => {
                setMode("login");
            })
            .catch((error) => {
                console.log("error");
            });
    };

    if (mode === "login") {
        return (
            <div>
                <div className="form-wrapper">
                    <form class="login-wrapper" onSubmit={handleSubmitLogin}>
                        <div class="host-title">Host and join hangouts!</div>

                        <div>
                            Email:
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            Password:
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <input
                                id="form-submit"
                                className="form-submit"
                                type="submit"
                                value="Login"
                            ></input>
                        </div>
                    </form>
                    {/* <button type="button" onClick={e => setMode('signup')}>Sign Up</button> */}
                    <p>
                        Don't have an account?{" "}
                        <u onClick={(e) => setMode("signup")}>Sign Up Here</u>
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="form-wrapper">
            <form class="login-wrapper" onSubmit={handleSubmitSignup}>
                <div class="host-title">Sign up to start mingling!</div>
                <div>
                    First name:
                    <input
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                    ></input>
                </div>
                <div>
                    Last name:
                    <input
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                    ></input>
                </div>
                <div>
                    Email:
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        id="form-submit"
                        className="form-submit"
                        type="submit"
                        value="Signup"
                    ></input>
                </div>
            </form>
        </div>
    );
}

export default Login;

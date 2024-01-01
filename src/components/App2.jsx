import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Main from './Main.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import TopBar from './Bars/TopBar.jsx';
import MyEvent from './MyEvent/MyEvent.jsx';
import Host from './Host/Host.jsx';

const App = () => {
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    if (mode === 'signup') {
        return
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password
        };
        axios.post('/login', data)
            .then((response) => {
                console.log(response);
                console.log('userId: ', response.data[0].userId)
                setUserId(response.data[0].userId);
                setMode('home');
            })
            .catch((error) => {
                console.log('error');
                setMode('signup');
            })
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        let data = {
            name: name,
            email: email,
            password: password
        };
        axios.post('/signup', data)
            .then((response) => {
                console.log(response);
                setMode('login');
            })
            .catch((error) => {
                console.log('error');
            })
    }

    if (mode === 'login') {
        return (
            <div className="login">
                LOGIN
                <form onSubmit={handleSubmitLogin}>
                    <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                    <input className='form-submit' type='submit' value='Login' ></input>
                </form>
                <p>Don't have an account? <u onClick={e => setMode('signup')}>Sign Up Here</u></p>
            </div>
        )
    } else if (mode === 'signup') {
        return (
            <div className="signup">
                SIGNUP
                <form onSubmit={handleSubmitSignup}>
                    <input type='text' placeholder='Name' onChange={e => setName(e.target.value)}></input>
                    <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                    <input className='form-submit' type='submit' value='Signup' ></input>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                HOME
                <BrowserRouter>
                    <TopBar />
                    <Switch>
                        <Route exact path='/'>
                            <HomeFeed />
                        </Route>
                        <Route path='/myevent'>
                            <MyEvent />
                        </Route>
                        <Route path='/host'>
                            <Host />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login.jsx';

function Signup(props) {
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    if (mode === 'login') {
        return <Login />;
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
}

export default Signup;
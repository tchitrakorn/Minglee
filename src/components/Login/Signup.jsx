import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login.jsx';

function Signup(props) {
    const [mode, setMode] = useState('login');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLirstname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [discord, setDiscord] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    if (mode === 'login') {
        return <Login />;
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        let data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            discord: discord,
            password: password
        };
        axios.post('http://localhost:8080/signup', data)
            .then((response) => {
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
                <input type='text' placeholder='Firstname' onChange={e => setFirstname(e.target.value)}></input>
                <input type='text' placeholder='Lirstname' onChange={e => setLirstname(e.target.value)}></input>
                <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
                <input type='phone' placeholder='Phone' onChange={e => setPhone(e.target.value)}></input>
                <input type='discord' placeholder='Discord' onChange={e => setDiscord(e.target.value)}></input>
                <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                <input className='form-submit' type='submit' value='Signup' ></input>
            </form>
        </div>
    )
}

export default Signup;
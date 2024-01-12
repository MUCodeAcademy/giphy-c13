import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUserContext();

    const handleLogin = async (e) => {
        // e.target.value will either be 'login' or 'register' depending on button they clicked,
        // so it just appends that to the end of our base url.
        const url = "http://localhost:3006/" + e.target.value;
        const data = {
            username: inputUsername,
            password: password
        }
        console.log(data);
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(response => {
            if (response === "Login successful." || response === "It worked") {
                setUser(inputUsername);
            } else {
                alert(response);
            }
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    };

    return (
        <div>
            <h1>Login Page</h1>
            <input 
                onChange={e => setInputUsername(e.target.value)}
                type='text'
                placeholder='Username'
            />
            <input 
                onChange={e => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
            />
            <button value='login' onClick={(e) => handleLogin(e)}>Login</button>
            <button value='register' onClick={(e) => handleLogin(e)}>Register</button>
        </div>
    );
};

export default LoginPage;

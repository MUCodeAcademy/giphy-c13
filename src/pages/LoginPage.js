import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUserContext();

    const handleLogin = async () => {
        setUser(inputUsername);
        const data = {
            username: inputUsername,
            password: password
        }
        console.log(data);
        const response = await fetch("http://localhost:3006/login", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
    };

    const handleRegister = async () => {
        setUser(inputUsername);
        const data = {
            username: inputUsername,
            password: password
        }
        console.log(data);
        const response = await fetch("http://localhost:3006/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
    }

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
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default LoginPage;

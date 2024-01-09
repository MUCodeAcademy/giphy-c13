import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState("");
    const { setUser } = useUserContext();

    const handleLogin = () => {
        setUser(inputUsername);
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
                type='password'
                placeholder='Password'
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;

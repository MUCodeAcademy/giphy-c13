import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUserContext();

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBzuXi5JpKSb_Xl-T8LeVPsCxz4U_mYWKA",
        authDomain: "giphy-3c831.firebaseapp.com",
        projectId: "giphy-3c831",
        storageBucket: "giphy-3c831.appspot.com",
        messagingSenderId: "69015639750",
        appId: "1:69015639750:web:919ef9fe72bbbd42c5e9c7"
    };
    
    // Initialize Firebase. We don't need this now, but you'd need in the future for extra functionality.
    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

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

    const googleSignIn = (e) => {
        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider);
    }

    const checkUserSignIn = () => {
        getRedirectResult(auth)
            .then((result) => {
                console.log(result);
                if (result !== null) {
                    setUser({ username: result.user.displayName })
                }
            });
    }

    useEffect(() => {
        checkUserSignIn();
    }, []);

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
            <button onClick={(e) => googleSignIn(e)}>Sign in with Google</button>
        </div>
    );
};

export default LoginPage;

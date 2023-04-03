import React, { useState, useEffect, useCallback } from "react";
import profile from '../../assets/Profile.svg';
import passwordicon from '../../assets/password-icon.svg';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { NavLink, useNavigate } from 'react-router-dom'




const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            // token on local storage
            // ...
            localStorage.setItem('token', user.uid)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 



    






    return (
        <>
       
        <div className='container-wrapper'>
            <h1>Login</h1>
            <span className='text-secondary'>Welcome back</span>
       
            <form >
            <div className="input-group input-login  rounded-2 align-items-center mt-5" >
                <div className="input-group-append p-2">
                    <img className='login-icon' src={profile} alt=""/>
                </div>
                <input
                    id="email-address"
                    name="email"
                    type="email"                                    
                    required                                                                                
                    placeholder="Email address"
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="input-group input-login  rounded-2 align-items-center mt-5" >
                <div className="input-group-append p-2">
                    <img className='login-icon' src={passwordicon} alt=""/>
                </div>
                <input
                    id="password"
                    name="password"
                    type="password"                                    
                    required                                                                                
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="form-check mt-5 w-100 d-flex justify-content-end">
                <button type="submit" className="btn btn-danger" onClick={onLogin} 
                >Submit</button>
            </div>
            </form>
            <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>        
           
           
            

        </div>
        </>
       

    );
}

export default LoginForm;
import React, { useState, useEffect, useCallback } from "react";
import profile from '../../assets/Profile.svg';
import passwordicon from '../../assets/password-icon.svg';
import {  createUserWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { NavLink, useNavigate } from 'react-router-dom'
import {postData} from '../../api/api.js'




const LogoutForm = () => {






    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [userList, setUserList] = useState([]);

    const postUser = useCallback(async (user) => {
        const data = await postData(user);
        setUserList(data);
    }, []);

 
    const onSubmit = async (e) => {
      e.preventDefault()

      const userObject = {
        email: email,
        password: password,
     };
     postUser(userObject);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            navigate("/")

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }


    






    return (
        <>
       
        <div className='container-wrapper'>
            <h1>Register</h1>
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
                <button type="submit" className="btn btn-danger" onClick={onSubmit}
                >Submit</button>
            </div>
            </form>
            <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
            </p>         
           
           
            

        </div>
        </>
       

    );
}

export default LogoutForm;
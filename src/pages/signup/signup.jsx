import React from 'react';
import LogoutForm from '../../components/loginForm/logoutForm';
import logo from '../../assets/logo.svg';
 
const Signup = () => {
 
 
  return (
            <div className='container '>



            <div className='row'>
            
            <div className='col-12  login-container'>
                <img className='logo-login' src={logo} alt=""/>
                <LogoutForm  />

            </div>
        
            </div>
            
        </div>
    );
}

 
export default Signup
import React from 'react';
import LoginForm from '../../components/loginForm/loginForm';
import '../../components/loginForm/css/loginForm.scss';
import logo from '../../assets/logo.svg';



class Login extends React.Component {
   




    render() {
        return (
        <div className='container '>



            <div className='row'>
             
            <div className='col-12  login-container'>
                <img className='logo-login' src={logo} alt=""/>
                <LoginForm  />

            </div>
           
            </div>
            
        </div>
        );
    }
    }

export default Login;

import React,{useState, useEffect} from 'react';
import Logo from '../../assets/logo.svg';
import ShoopingCart from '../../assets/fa_shopping-basket.svg';
import './css/navbar.scss';
import OrderAside from '../orderAside/orderAside.jsx';
import { onAuthStateChanged, signOut  } from "firebase/auth";
import { auth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import {getUserById } from '../../api/api.js';



const Navbar = ({ userData, cartShopping, setCartShopping }) => {
    const [showCart, setShowCart] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    const [user, setUser] = useState({});

    const getUserData = async (id) => {
        const data = await getUserById(id);
        setUser(data);
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {

                getUserData(user.uid);
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
            }
        });
    },[]);

    


    const handleCart = () => {
        setShowCart(!showCart);
    }

    const handleMenu = () => {
        setShowMenu(!showMenu);
    }

    let userLogged = auth.currentUser;
   
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const totalOfProducts = () => {
        let total = 0;
        cartShopping?.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };



    return (

        <>

        <nav className='navbar-wrapper py-0 fixed-top container' >
            <div className='d-flex justify-content-between align-items-center '>
                <div className='logo-nav'>
                    <img src={Logo} alt="Logo" />
                </div>
                <div className='nav-right '>
                    <ul className='d-flex align-items-center justify-content-center'>
                    <li className='me-3'> {userLogged ? user.email : "Guest"}</li>

                        <li className='nav-cart d-flex' onClick={handleCart}>
                            <img src={ShoopingCart} alt="Shopping Cart" />

                            <div>
                                <span className='cart-quantity'>{totalOfProducts()}</span>
                            </div>


                        </li>

                        <li className='avatar ms-3' onClick={handleMenu}>
                            <img src="https://www.gravatar.com/avatar/bfcb1d6a22d7098499771d3bcec5a8c4?d=identicon&f=y&s=128" alt="Avatar" />
                        </li>
                    </ul> 
                    { showMenu && (

                        <div className='menu' >  
                            { userLogged ? <span onClick={handleLogout}>Logout</span> : <span onClick={handleLogin}>Login</span> }   
                        </div>
                        
                    )}
                    
                </div>
                
            </div>
            <OrderAside showCart={showCart} setShowCart={setShowCart} userData={userData} cartShopping={cartShopping} setCartShopping={setCartShopping} />
         
        </nav> 

        </>
       
    );
}

export default Navbar;
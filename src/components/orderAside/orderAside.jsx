import React, {useState, useEffect, useCallback} from 'react';
import './css/orderAside.scss';
import closeIcon from '../../assets/close-icon.svg';
import flechita from '../../assets/flechita.svg';
import {getUserById,deleteDataById, updateDataById } from '../../api/api.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../../firebase.js';






const OrderAside = ({showCart,setShowCart, userData,cartShopping, setCartShopping }) => {


    const [user, setUser] = useState({});
    const [saveButton, setSaveButton] = useState(false);
    const [shoppingCartButton, setShoppingCartButton] = useState(false);

    const getUserData = useCallback(async (id) => {
        const data = await getUserById(id);
        setUser(data);
    },[]);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserData(user.uid);
            } else {

                console.log("user is logged out")
            }
        });
    },[getUserData]);

     console.log(user);
     console.log(userData)

   
    const closeCart = () => {
        setShowCart(!showCart);
    }

    const showTotal = (value) => {
        let total = 0;
        if(value === 'userCart'){
            user.cart?.map((item) => {
                total += item.price * item.quantity;
            })
        }else{
            cartShopping?.map((item) => {
                total += item.price * item.quantity;
            })
        }
        
        return Math.round(total * 100) / 100;
    };

    const deleteItem = async (idProduct) => {
       const idUser = user.uid;

       const newCart = user.cart.map((item) => {
              if(item.id === idProduct){
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                }else{
                    return item;
                }
            }).filter((item) => item.quantity > 0);

        const data = {
            cart: newCart,
        }

        const response = await updateDataById(idUser, data);

        localStorage.setItem('cart', JSON.stringify(newCart));
        getUserData(idUser);

    }

    const filterButton = () => {
        setSaveButton(!saveButton);
        setShoppingCartButton(!shoppingCartButton);
    }

    const handleRemove = (id) => {
        const newCart = cartShopping.map((item) => {
            return item.id === id ? {...item, quantity: item.quantity - 1} : item;
        }
        );
        const newCart2 = newCart.filter((item) => item.quantity > 0);
        setCartShopping(newCart2);
        //save to local storage
        localStorage.setItem('cart', JSON.stringify(newCart2));
        
    }






    
    return (
        <>
    {showCart  === false ? 

        <section className="product-detail">
            <div className="d-flex justify-content-between">
            <img className='arrow-icon' src={flechita} alt="arrow" onClick={closeCart}/>
            <p className="title fs-5">My order</p>
            </div>

            <div className="d-flex justify-content-between">

            
                <button className="primary-button" onClick={filterButton}>
                    saved by user
                </button>

            </div>

                <div className="my-order-content">
                    <ul className = 'd-flex justify-content-around tag-list'>
                    <li>image</li>
                    <li>product</li>
                    <li>price</li>    
                    <li>quantity</li>

                    </ul>
              <>
                <section className='order-list'>
                    {
                        //save button is true show saved by user user.cart.map else show cart cartShopping.map
                        saveButton ? user?.cart?.map((item) => (

                        <div className="shopping-cart" key={item.id}>
                            <figure>
                            <img src={item.image} alt="product" />
                            </figure>
                            <p>{ `${item.title.slice(0, 10)}...`}</p>
                            <p>{ item.price}</p>
                            <p>{ item.quantity}</p>
                            <img className='close-icon' src={closeIcon}  alt="close" onClick={() =>deleteItem(item.id)}/>
                        </div>
                    )) : cartShopping?.map((item) => (
                        <div className="shopping-cart" key={item.id}>
                        <figure>
                        <img src={item.image} alt="product" />
                        </figure>
                        <p>{ `${item.title.slice(0, 10)}...`}</p>
                        <p>{ item.price}</p>
                        <p>{ item.quantity}</p>
                        <img className='close-icon' src={closeIcon}  alt="close" onClick={() => handleRemove(item.id)}/>
                    </div>
                    ))
                    }


            
                </section>
                </>


                    <div className="order">
                        <p>
                        <span>Total</span>
                        </p>
                        {saveButton ? <p>${showTotal('userCart')} MXN</p> : <p>${showTotal('shoppingCart')} MXN</p>}
                    </div>

                    <button className="primary-button">
                        Checkout
                    </button>
                </div>
        </section>
         : null}
        </>
       
    );
}

export default OrderAside;
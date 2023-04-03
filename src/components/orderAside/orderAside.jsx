import React, {useState, useEffect, useCallback} from 'react';
import './css/orderAside.scss';
import closeIcon from '../../assets/close-icon.svg';
import flechita from '../../assets/flechita.svg';
import {getUserById,deleteDataById, updateDataById } from '../../api/api.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../../firebase.js';






const OrderAside = ({showCart,setShowCart, userData}) => {


    const [user, setUser] = useState({});

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

    const showTotal = () => {
        let total = 0;
        user?.cart?.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    };

    // delete by iduser AND idproduct
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







    
    return (
        <>
    {showCart  === false ? 

        <section className="product-detail">
            <div className="d-flex justify-content-between">
            <img className='arrow-icon' src={flechita} alt="arrow" onClick={closeCart}/>
            <p className="title fs-5">My order</p>
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
                      {user?.cart?.map((item) => (

                        <div className="shopping-cart" key={item.id}>
                            <figure>
                            <img src={item.image} alt="product" />
                            </figure>
                            <p>{ `${item.title.slice(0, 10)}...`}</p>
                            <p>{ item.price}</p>
                            <p>{ item.quantity}</p>
                            <img className='close-icon' src={closeIcon}  alt="close" onClick={() => deleteItem(item.id)}/>
                        </div>
                        ))}
            
                </section>
                </>


                    <div className="order">
                        <p>
                        <span>Total</span>
                        </p>
                        <p>${Math.round(showTotal() * 100) / 100} MXN</p>
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
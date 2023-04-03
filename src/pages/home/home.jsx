import React, { useState, useEffect, useCallback } from "react";
import Card from '../../components/card/card.jsx'
import Navbar from '../../components/navbar/navbar.jsx'
import SearchBar from '../../components/search-bar/searchBar.jsx'
import Categories from '../../components/categories/categories.jsx'
import Slider from '../../components/slider/slider.jsx'
import {getData,updateDataById, getUserById} from '../../api/api.js'
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../../firebase.js';





const CardList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const[isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState(null);
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
    

    const getProducts = useCallback(async (id) => {
        const data = await getData(id);
        setProducts(data);
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const categoryItems = [...new Set(products.map((product) => product.category))];



    const filterProducts = (category) => {
        if (category === 'All') {
            getProducts();
            return;
        }
        const filteredProducts = products.filter((product) => product.category === category);
        products.length = 0;
        setProducts(filteredProducts);
        
    };

    const searchProducts = (searchTerm) => {
        if (searchTerm === '') {
            getProducts();
            return;
        }
        const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setProducts(filteredProducts);
    };

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("user is logged in")
                setIsLogged(true);
                setUserData(user)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])

    useEffect(() => {
        /*sacamos el token del LS*/
        const token = localStorage.getItem("token");
        const cart = JSON.parse(localStorage.getItem("cart"));
        /*Si el token existe, sacamos su info y la guardamos en el estado*/
        if (token) {
            const user = token;
            setUserData(user);
            setCart(cart);
            setIsLogged(true);
        }
      }, [isLogged]);


    
        const addToCart = useCallback (async(product) => {
            const user = { ...userData };
            const isProductInCart = cart.find((item) => item.id === product.id);
            isProductInCart ? setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)) : setCart([...cart, { ...product, quantity: 1 }]);
           
            const updatedUser = { ...user, cart: [...cart] };

            const  db = await updateDataById(user.uid, updatedUser);
            console.log(db)



            setUserData(updatedUser);

        }, [cart, userData])

        console.log(userData)




    return (
        <>
        <Navbar userData={userData} setUserData={setUserData}/>
        <div className="container py-5 my-5">
           
            <SearchBar searchProducts={searchProducts} />
            <Slider />
            <h2 className='mx-4'>Products</h2>
            
            <Categories 
                  categoryItems={categoryItems}
                    filterProducts={filterProducts}
                
            />

           
            <div className="d-flex justify-content-center align-items-center card-list row">
               {products.map((product) => (
                
                    <Card
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                        item={product}
                        addToCart={addToCart}

                      
                    />
                ))}


            </div>
        </div>
        </>
        

    );
}

export default CardList;
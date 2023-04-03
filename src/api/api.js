const URL_BASE = "https://fakestoreapi.com/products"
const URL_USER = "https://fake-shop-d2807-default-rtdb.firebaseio.com/data"


const getData = async (id) => {
    const apiURL = id ? `${URL_BASE}` : URL_BASE;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Fetch Error", error);
    }
}

const getUserById = async (id) => {
    const apiURL = id ? `${URL_USER}/${id}/.json` : URL_USER;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Fetch Error", error);
    }
}

const deleteDataById = async (id, idCart) => {
    try {
        const response = await fetch(`${URL_USER}/${id}/cart/${idCart}/.json`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Fetch Error", error);
    }
}




const postData = async (user) => {
    try {
        const response = await fetch(`${URL_USER}/.json`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Fetch Error", error);
    }
}

const updateDataById = async (id, user) => {
    try {
        const response = await fetch(`${URL_USER}/${id}/.json`, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Fetch Error", error);
    }
}





export { getData , postData, updateDataById, getUserById, deleteDataById};
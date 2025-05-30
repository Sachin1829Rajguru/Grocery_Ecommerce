import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyProducts from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const Appcontext = createContext();
export const Provider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isseller, setseller] = useState(false);
    const [uselogin, setuserlogin] = useState(false);
    const [searchquery, setsearchquery] = useState({});
    const [products, setproducts] = useState([]);
    const [cartitems, setcartitems] = useState({});

    const fetchproducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setproducts(data.products);
            }
            else
                toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    const fetchseller = async (req, res) => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success)
                setseller(true);
            else
                setseller(false);
        } catch (error) {
            setseller(false);
        }
    }
    const fetchuser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
                setuser(data.user);
                setcartitems(data.user.cartitems);
            }
        } catch (error) {
            setuser(null);
        }
    }


    useEffect(() => {
        fetchuser();
        fetchseller();
        fetchproducts();
    }, []);
    useEffect(() => {
        const fetchcart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartitems });
                if (!data.success)
                    toast.error(data.message);
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (user)
            fetchcart();
    }, [cartitems])
    const addtocart = (itemid) => {
        const cartdata = structuredClone(cartitems);
        if (cartdata[itemid])
            cartdata[itemid] += 1;
        else
            cartdata[itemid] = 1;
        setcartitems(cartdata);
        toast.success("Added to Cart");
    }
    const updatecart = (itemid, quantity) => {
        const cartdata = structuredClone(cartitems);
        cartdata[itemid] = quantity;
        setcartitems(cartdata);
        toast.success("Cart Updated");
    }
    const removefromcart = (itemid) => {
        const cartdata = structuredClone(cartitems);
        if (cartdata[itemid]) {
            cartdata[itemid] -= 1;
            if (cartdata[itemid] === 0)
                delete cartdata[itemid];
        }
        setcartitems(cartdata);
        toast.success("Removed from Cart");
    }
    const getcount = () => {
        let count = 0;
        for (const key in cartitems) {
            count += cartitems[key];
        }
        return count;
    }
    const getamount = () => {
        let totalAmount = 0;
        for (const items in cartitems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartitems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartitems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    const value = {
        navigate, user, setuser, isseller, setseller, uselogin, setuserlogin, currency,
        searchquery, setsearchquery, products, addtocart, updatecart, removefromcart,
        cartitems,setcartitems, getcount, getamount, axios, fetchproducts
    }
    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}
export const useAppcontext = () => {
    return useContext(Appcontext);
}

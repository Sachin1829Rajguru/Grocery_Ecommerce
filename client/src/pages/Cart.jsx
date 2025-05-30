import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppcontext } from '../context/appcontext'
import { dummyAddress } from '../assets/assets';
import toast from 'react-hot-toast';
import icon from '../assets/remove_icon.svg'
import icon2 from '../assets/arrow_right_icon_colored.svg'
const Cart = () => {
    const [showAddress, setShowAddress] = React.useState(false)
    const [cartarray, setcartarray] = React.useState([]);
    const [payoption, setpayoption] = useState("COD");
    const [address, setaddress] = useState([]);
    const [selectedaddress, setselectedaddress] = useState(null);
    const { updatecart, removefromcart, cartitems, axios, getcount, getamount, products, currency, navigate, user, setcartitems } = useAppcontext();
    const getcart = () => {
        let array = [];
        for (const key in cartitems) {
            const product = products.find((item) => item._id == key);
            product.quantity = cartitems[key];
            array.push(product);
        }
        setcartarray(array);
    }
    const placeorder = async (req, res) => {
        try {
            if (!user)
                return toast.error("Please login to place order.");
            if (!selectedaddress)
                return toast.error("Please select an address.");
            if (payoption == "COD") {
                const { data } = await axios.post('/api/order/cod', {
                    userid: user._id,
                    items: cartarray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedaddress._id
                })
                if (data.success) {
                    toast.success(data.message);
                    setcartitems({});
                    navigate('/my-orders');
                }
                else
                    toast.error(data.message);
            }
            else {
                const { data } = await axios.post('/api/order/stripe', {
                    userid: user._id,
                    items: cartarray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedaddress._id
                })
                if (data.success) {
                    window.location.replace(data.url);
                }
                else
                    toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getuseraddress = async (req, res) => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setaddress(data.address);
                if (data.address.length > 0)
                    setselectedaddress(data.address[0]);
            }
            else
                toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (user)
            getuseraddress();
    }, [user])
    useEffect(() => {
        if (products.length > 0 && cartitems)
            getcart();
    }, [products, cartitems])
    return products.length > 0 && cartitems ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getcount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartarray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() => {
                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                    scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select
                                            onChange={(e) => { updatecart(product._id, Number(e.target.value)) }}
                                            value={cartitems[product._id]}
                                            className='outline-none'>
                                            {Array(cartitems[product._id]).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button
                            onClick={() => removefromcart(product._id)}
                            className="cursor-pointer mx-auto">
                            <img src={icon} alt="remove" className='inline-block w-6 h-6'></img>
                        </button>
                    </div>)
                )}
                <button onClick={() => { navigate("/products"); scrollTo(0, 0); }}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img className="group-hover:translate-x-1 transition"
                        src={icon2} alt="arrow" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedaddress ? `${selectedaddress.street}, ${selectedaddress.city}, ${selectedaddress.state}, ${selectedaddress.country}` : "No address found"}
                        </p>

                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {address.map((curraddress, index) => (
                                    <p
                                        onClick={() => {
                                            setselectedaddress(curraddress);
                                            setShowAddress(false);
                                        }}
                                        className="text-gray-500 p-2 hover:bg-gray-100"
                                    >
                                        {curraddress.street}, {curraddress.city}, {curraddress.state}, {curraddress.country}
                                    </p>
                                ))}

                                <p onClick={() => navigate("/add-address")} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e) => setpayoption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getamount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{(getamount() * 0.02).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{(getamount() * 1.02).toFixed(2)}</span>
                    </p>
                </div>

                <button onClick={placeorder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {payoption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null
}
export default Cart
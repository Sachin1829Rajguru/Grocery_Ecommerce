import React from 'react'
import Navbar from './components/navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home'
import { Toaster } from "react-hot-toast"
import Footer from './components/Footer'
import { useAppcontext } from './context/appcontext'
import Login from './components/login'
import Products from './pages/Products'
import Productcategory from './pages/Productcategory'
import Productdetails from './pages/Productdetails'
import Cart from './pages/Cart'
import Address from './pages/Address'
import SLogin from './components/Seller/SLogin'
import Layout from './pages/Seller/Layout'
import Addproduct from './pages/Seller/Addproduct'
import Orders from './pages/Seller/Orders'
import Productlist from './pages/Seller/Productlist'
import Myorders from './pages/Myorders'
import Loading from './components/Loading'
function App() {
  const issellerpath = useLocation().pathname.includes("seller")
  const { uselogin, isseller } = useAppcontext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {issellerpath ? null : <Navbar />}
      <Toaster />
      {uselogin ? <Login /> : null}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Productcategory />} />
          <Route path="/products/:category/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<Address />} />
          <Route path="/my-orders" element={<Myorders />} />
           <Route path="/loader" element={<Loading />} />
          <Route path="/seller" element={isseller ? <Layout /> : <SLogin />} >
            <Route index element={isseller ? <Addproduct /> : null} />
            <Route path="product-list" element={<Productlist />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!issellerpath && <Footer />}
    </div>
  )
}

export default App

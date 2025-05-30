import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import icon from '../assets/search_icon.svg'
import navcart from '../assets/nav_cart_icon.svg'
import menu from '../assets/menu_icon.svg'
import profile from '../assets/profile_icon.png'
import { useAppcontext } from '../context/appcontext'
import { toast } from 'react-hot-toast'
function Navbar() {
    const [open, setOpen] = React.useState(false)
    const { user, setuser, setuserlogin, navigate, searchquery, setsearchquery, getcount, axios } = useAppcontext();
    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setuser(null);
                navigate('/');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (searchquery && Object.keys(searchquery).length > 0) {
            navigate('/products');
        }
    }, [searchquery])
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-9" src={logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <a
                    href="/seller"
                    style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        backgroundColor: "#fff", // matches page background
                        borderRadius: "16px",
                        textDecoration: "none",
                        color: "#333",
                        fontWeight: "500",
                        fontSize: "14px",
                        border: "1px solid #ddd",
                        transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                    Seller Dashboard
                </a>

                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setsearchquery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={icon} alt="search" className='w-4 h-4' />
                </div>

                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={navcart} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getcount()}</button>
                </div>

                {!user ? (
                    <button onClick={() => setuserlogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={profile} className='w-10' alt="" />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )

                }
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={navcart} alt='cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getcount()}
                    </button>
                </div>

                <button
                    onClick={() => open ? setOpen(false) : setOpen(true)}
                    aria-label="Menu"
                    className=""
                >
                    <img src={menu} alt='menu' />
                </button>
            </div>

            {/* Mobile Menu */}
            {
                open && (<div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}>
                    <a
                        href="/seller"
                        style={{
                            display: "inline-block",
                            padding: "6px 12px",
                            backgroundColor: "#fff", // matches page background
                            borderRadius: "16px",
                            textDecoration: "none",
                            color: "#333",
                            fontWeight: "500",
                            fontSize: "14px",
                            border: "1px solid #ddd",
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                    >
                        Seller Dashboard
                    </a>

                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Product</NavLink>
                    {
                        user &&
                        <div onClick={() => { setOpen(false), navigate("my-orders") }}>My Orders</div>
                    }
                    {
                        !user ? (
                            <button onClick={() => { setOpen(false); setuserlogin(true); }}
                                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                                Login
                            </button>
                        ) : (
                            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                                Logout
                            </button>
                        )
                    }

                </div>)
            }

        </nav >
    )
}

export default Navbar

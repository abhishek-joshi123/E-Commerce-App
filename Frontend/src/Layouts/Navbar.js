
import React, { useContext, useEffect, useState } from 'react'
import Cart from '../Images/Cart.png'
import '../Styles/Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {IoIosSearch} from 'react-icons/io'
import { useAuth } from '../Components/Contexts/Auth'
import { toast } from "react-toastify";
import Cartopia from '../Images/Cartopia.png'
import { CategoryContext } from '../Components/Contexts/CategoryContext'
import Badge from '@mui/material/Badge';
import { useStateValue } from '../Components/Contexts/CartContext'
import { MdArrowBack } from 'react-icons/md';
import {BiShoppingBag} from 'react-icons/bi'
import {TfiLocationPin} from 'react-icons/tfi'
import {FaRupeeSign} from 'react-icons/fa'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

 
export default function Navbar() {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [Click, setClick] = useState(false)
    const [auth, setAuth] = useAuth()
    const context = useContext(CategoryContext)
    const {setProducts, search, setSearch, getTotalSearch, setFilter, loader} = context
    const navigate = useNavigate()
    const [{basket}] = useStateValue()
    const location = useLocation();
    const [activeFirst, setActiveFirst] = useState(false)
    const [activeSecond, setActiveSecond] = useState(false)
    const [activeThird, setActiveThird] = useState(false)

    useEffect(() => {
        if(location.pathname === '/cart'){
            setActiveFirst(true);
            setActiveSecond(false);
            setActiveThird(false);
        }
        else if(location.pathname === '/cart/delivery'){
            setActiveFirst(false);
            setActiveSecond(true);
            setActiveThird(false);
        }
        else{
            setActiveFirst(false);
            setActiveSecond(false);
            setActiveThird(true);
        }
    },[])
    
    useEffect(() => {
        function handleSearchOpen() {
          if(window.innerWidth >= 600)
          setIsSearchOpen(false)
        }
    
        window.addEventListener("resize", handleSearchOpen);
        handleSearchOpen();
    
        return () => {
          window.removeEventListener("resize", handleSearchOpen);
        };
      }, []);
 
    const handleLogout = () => {

        setAuth({
            ...auth,
            user:null, 
            token:""
        })
        localStorage.removeItem('auth');
        toast.success('Logout Successfully')
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/product/search-product/${1}/${search}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }, 
            }) 

            const json = await response.json()
            if(json?.success){
                getTotalSearch()
                navigate(`/search/${search}`)
                setProducts(json.products)
            }
        } catch (error) {
            navigate('/')
        }
    }

    const handelNavigate = () => {
        if(location.pathname === '/cart/payment') {
            navigate('/cart/delivery')
        }
    }

  return (
        <header>
            <nav>
                <div className='Cartopia'><Link to="/"><img src={Cartopia} alt="" /></Link></div>
                <div className='links'>
                    <ul id='firstUl'>
                        <span id='Nav-span-name'>{auth?.user?.name}</span>
                       <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}> <li>My Account</li></Link>
                        {!auth.user ? (
                                <Link to="/sign-in"><li>Sign In</li></Link>
                            ) 
                             :  
                            (
                                <Link to="/sign-in" onClick={handleLogout}><li>Sign Out</li></Link>
                            ) 
                        }
                        <Link to="/chatbot"><li>Customer Care</li></Link>
                    </ul>
                    {
                        (location.pathname === '/cart' || location.pathname === '/cart/delivery' || location.pathname === '/cart/payment') ? (
                            <div className='CheckOut-navigation-div'>
                                <span className={`CheckOut-navigation-logo ${activeFirst ? 'active1-logo' : 'first-logo'}`} onClick={() =>{navigate('/cart')}}><BiShoppingBag style={{color: '#fff'}}/></span>
                                <span className='CheckOut-navigation-line'></span>
                                <span className={`CheckOut-navigation-logo ${activeSecond ? 'active2-logo' : 'second-logo'}`} onClick={handelNavigate}><TfiLocationPin style={{color: '#fff'}}/></span>
                                <span className='CheckOut-navigation-line'></span>
                                <span className={`CheckOut-navigation-logo ${activeThird ? 'active3-logo' : 'third-logo'}`} ><FaRupeeSign style={{color: '#fff'}}/></span>
                            </div>
                        ) : (
                            <div id='secondUl'>
                            <ul className='nav-links-filter'>
                                <li onClick={() => {setFilter('Men')}}><Link to="/filter-product">MEN</Link></li>
                                <li onClick={() => {setFilter('Women')}}><Link to="/filter-product">WOMEN</Link></li>
                                <li onClick={() => {setFilter('Kids')}}><Link to="/filter-product">KIDS</Link></li>
                                <li onClick={() => {setFilter('Home and kitchen')}}><Link to="/filter-product">HOME AND KITCHEN</Link></li>
                            </ul>
                            <form className="search-container" onSubmit={handleSearch}>
                                <input className="search-input" type="text" placeholder='Search Cartopia' value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                                <i className="search-icon" onClick={handleSearch}><IoIosSearch/></i>
                            </form>
                            {!isSearchOpen && <i className="search-icon-small-screen" onClick={() => {setIsSearchOpen(!isSearchOpen)}}><IoIosSearch/></i>}
                                {isSearchOpen && <div className='small-screen-search-div'>
                                    {isSearchOpen && <i className="search-icon-cross" onClick={() =>{setIsSearchOpen(!isSearchOpen)}}><MdArrowBack/></i>}
                                    <form className="search-container-small-screen" onSubmit={handleSearch}>
                                            <input className="search-input" type="text" placeholder='Search Cartopia' value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                                            <i className="search-icon" onClick={handleSearch}><IoIosSearch/></i>
                                        </form>
                                </div>
                                }
                            {!isSearchOpen && <div className="dropdown">
                                <button className="dropbtn" onClick={() => {setClick(!Click)}}>Categories</button>
                                {
                                    Click && <div className="dropdown-content">
                                        <li onClick={() => {setFilter('Men')}}><Link to="/filter-product">MEN</Link></li>
                                        <li onClick={() => {setFilter('Women')}}><Link to="/filter-product">WOMEN</Link></li>
                                        <li onClick={() => {setFilter('Kids')}}><Link to="/filter-product">KIDS</Link></li>
                                        <li onClick={() => {setFilter('Home and kitchen')}}><Link to="/filter-product">HOME AND KITCHEN</Link></li>
                                    </div>
                                }
                            </div>}
                            <Badge badgeContent={basket?.length} color="error">
                                <Link className='cartAndWish' to="/cart" ><img src={Cart} alt="Cart" /></Link>
                            </Badge>
                        </div>
                        )
                    }
                </div>
            </nav>
            {
                loader && <Box sx={{ width: '100%', position: 'fixed', top: '90px', left: '0', '@media screen and (max-width: 400px)': {top: '80px'}, }}>
                            <LinearProgress />
                        </Box>
            }
        </header>
  )
} 
 
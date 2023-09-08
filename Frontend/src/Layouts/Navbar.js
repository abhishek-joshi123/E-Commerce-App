
import React, { useContext } from 'react'
import Cart from '../Images/Cart.png'
import Heart from '../Images/Heart.png'
import '../Styles/Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {IoIosSearch} from 'react-icons/io'
import { useAuth } from '../Components/Contexts/Auth'
import { toast } from "react-toastify";
import ajioLogo from '../Images/ajioLogo.png'
import { CategoryContext } from '../Components/Contexts/CategoryContext'
import Badge from '@mui/material/Badge';
import { useStateValue } from '../Components/Contexts/CartContext'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper'; 
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Bag', 'Delivery Details', 'Payment'];

export default function Navbar() {

    const [auth, setAuth] = useAuth()
    const context = useContext(CategoryContext)
    const {setProducts, search, setSearch, getTotalSearch, setFilter, activeStep} = context
    const navigate = useNavigate()
    const [{basket}] = useStateValue()
    const location = useLocation();
 
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

  return (
        <header>
            <nav style={{height: location.pathname === '/cart' || location.pathname === '/cart/delievery' ? '110px' : '100px'}}>
                <div className='azio'><Link to="/"><img src={ajioLogo} alt="" /></Link></div>
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
                        <p id='visit'>Visit AJIOLUXE</p>
                    </ul>
                    {
                        location.pathname === '/cart' || location.pathname === '/cart/delievery' ? (
                            <Box sx={{ width: '50%' }}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                
                                    return (
                                        <Step key={label} {...stepProps} >
                                        
                                        <StepLabel {...labelProps}>
                                            {label}</StepLabel>
                                        </Step>
                                    );
                                    })}
                                </Stepper>
                            </Box>
                        ) : (
                            <ul id='secondUl'>
                            <Link className='nav-links-filter' to="/filter-product"><li onClick={() => {setFilter('Men')}}>MEN</li></Link>
                            <Link className='nav-links-filter' to="/filter-product"><li onClick={() => {setFilter('Women')}}>WOMEN</li></Link>
                            <Link className='nav-links-filter' to="/filter-product"><li onClick={() => {setFilter('Kids')}}>KIDS</li></Link>
                            <Link className='nav-links-filter' to="/filter-product"><li onClick={() => {setFilter('Home and kitchen')}}>HOME AND KITCHEN</li></Link>
                            <form className="search-container" onSubmit={handleSearch}>
                                <input className="search-input" type="text" placeholder='Search AJIO' value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                                <i className="search-icon" onClick={handleSearch}><IoIosSearch/></i>
                            </form> 
                            <Link className='cartAndWish' to="/Wishlist"><img src={Heart} alt="Wishlist" /></Link>
                            <Badge badgeContent={basket?.length} color="error">
                                <Link className='cartAndWish' to="/cart" ><img src={Cart} alt="Cart" /></Link>
                            </Badge>
                        </ul>
                        )
                    }
                </div>
            </nav>
        </header>
  )
} 
 
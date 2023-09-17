import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Home/Home';
import PageNotFound from './Components/PageNotFound';
import Policy from './Components/Policy';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import ForgotPassword from './Components/Auth/ForgotPassoword';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './Components/Users/Dashboard';
import PrivateRoute from './Components/Routes/Private';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Components/Admin/Dashboard';
import AdminCategory from './Components/Admin/CategorySection/AdminCategory';
import AdminProduct from './Components/Admin/ProductSection/AdminProduct';
import Order from './Components/Admin/UserSection/Order';
import Profile from './Components/Users/Profile'; 
import Orders from './Components/Users/Orders';
import Products from './Components/Admin/AllProductsSection/Products';
import UpdateSection from './Components/Admin/AllProductsSection/UpdateSection';
import Search from './Components/Search';
import ProductDetails from './Components/Home/ProductDetails';
import FilterProducts from './Components/Home/FilterProducts';
import Cart from './Components/Cart/Cart';
import Delievery from './Components/Cart/Delievery';
import Payment from './Components/Cart/Payment';
import { useEffect } from 'react';


function App() { 

  // useEffect(() => {
  //   fetch("https://abhishek-joshi.onrender.com")
  //     .then((res) => res.json())
  // },[]);

  return ( 
      <>    
        <ToastContainer/>
        <Routes>
              <Route path='/' element= {<Home/>}/>
              <Route path='/search/:search' element= {<Search/>}/>
              <Route path='/filter-product' element= {<FilterProducts/>}/> 
              <Route path='/product/:slug' element= {<ProductDetails/>}/>
              <Route path='/about' element= {<About/>}/> 
              <Route path='/contact' element= {<Contact/>}/>
              <Route path='/policy' element= {<Policy/>}/>
              <Route path='/cart' element= {<Cart/>}/>
              <Route path='/cart/delivery' element= {<Delievery/>}/>
              <Route path='/cart/payment' element= {<Payment/>}/>
              <Route path='/dashboard' element= {<PrivateRoute />}>
                  <Route path='user' element = {<Dashboard />} />
                  <Route path='user/profile' element = {<Profile />} /> 
                  <Route path='user/orders' element = {<Orders />} />
              </Route>
              <Route path='/dashboard' element= {<AdminRoute />}>
                  <Route path='admin' element = {<AdminDashboard />} />
                  <Route path='admin/create-category' element = {<AdminCategory />} />
                  <Route path='admin/create-product' element = {<AdminProduct />} />
                  <Route path='admin/products' element = {<Products />} />
                  <Route path='admin/products/:slug' element = {<UpdateSection />} />
                  <Route path='admin/orders' element = {<Order />} />
              </Route>
              <Route path='/sign-in' element= {<SignIn/>}/>  
              <Route path='/sign-up' element= {<SignUp/>}/>
              <Route path='/forgot-password' element= {<ForgotPassword/>}/>
              <Route path='*' element= {<PageNotFound/>}/>
        </Routes>
      </>
  );
}
 
export default App;

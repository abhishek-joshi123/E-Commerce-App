import React, { useContext, useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/SignIn.css'
import LoginImage from '../../Images/LoginImage.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import { toast } from "react-toastify";
import { useAuth } from '../Contexts/Auth'
import { CategoryContext } from '../Contexts/CategoryContext'


export default function SignIn() {

  const host = process.env.REACT_APP_LOCAL_HOST
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const context = useContext(CategoryContext)
    const {setLoader} = context;
    const location = useLocation()

    const HandleSubmit = async (e) => {
      e.preventDefault();

      try {
        setLoader(true);
        const response = await fetch(`${host}/api/auth/login`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          }, 
          body: JSON.stringify({email:email, password:password})
        })
  
        const json = await response.json()
        if(json.success){
          toast.success(json.message)
          setAuth({
            ...auth,
            user:json.user,
            token:json.auth_token
          })
          localStorage.setItem('auth', JSON.stringify(json))
          navigate(location.state || '/')
        }
        else{
          if(json.Esuccess)
          toast.error(json.errors[0].msg)
        else
        toast.error(json.message)
    }
      setLoader(false);
    } catch (error) {
        console.error("Something went wrong");
        setLoader(false);
    }
    };

  return (
    <Layout title = {'Sign-in Ecommerce App'}>
        <div className="SignIn-div">
            <div className="SignIn-RightDiv">
              <img src= {LoginImage} alt='failed'/> 
            </div>
            <div className="SignIn-LeftDiv">
                  <form>
                      <div className="Form-Heading">
                        <h1>Sign In</h1>
                      </div>
                      <div className="SignIn-inputs">
                        <input type="email" placeholder='Enter email here' value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                        <input type="password" placeholder='password should contain atleast 8 characters' value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                      </div>
                      <div className='Login-btn'>
                        <button className='Log-btn' onClick={HandleSubmit}>Log in</button>
                        <Link to="/forgot-password"><p>Forgot Your Password?</p></Link>
                        <button className='Google-SignIn'><FcGoogle style={{fontSize: "1.5em", marginLeft: "5px"}}/><p>Continue with google</p></button>
                        <p>or</p>
                        <Link to="/sign-up">
                          <button className='Log-btn'>Create Account</button>
                        </Link>
                        <p className='Login-last-para'>By logging in you agree to Ajio's <span>Terms of Service</span> and <span>Privacy Policy</span></p>
                      </div>
                  </form>
            </div>
        </div>
    </Layout>
  )
}

import React, { useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/SignIn.css'
import LoginImage from '../../Images/LoginImage.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const HandleSubmit = async (e) => {
      e.preventDefault();

      try {
        
        const response = await fetch(`http://localhost:5000/api/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          }, 
          body: JSON.stringify({email:email, password:password, answer:answer})
        })
  
        const json = await response.json()

        if(json.success){
          toast.success(json.message)          
          navigate('/sign-in')
        }
        else{
          if(json.Esuccess)
            toast.error(json.errors[0].msg)
          else
            toast.error(json.message)
        }
  
      } catch (error) {
        toast.error("Something went wrong");
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
                        <h1 style={{fontSize: "1.8rem"}}>Reset Password</h1>
                      </div>
                      <div className="SignIn-inputs">
                        <input type="email" placeholder='Enter email here' value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                        <input type="text" placeholder='Enter your favourite sport' value={answer} onChange={(e) => {setAnswer(e.target.value)}} required/>
                        <input type="password" placeholder='Enter a new password' value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                      </div>
                      <div className='Login-btn'>
                        <button className='Log-btn' onClick={HandleSubmit}>Reset password</button>
                        <p style={{marginTop: "10px"}}>or</p>
                        <Link to="/sign-in">
                          <button className='Log-btn'>Back to login</button>
                        </Link>
                        <p className='Login-last-para'>By Reseting password you agree to Ajio's <span>Terms of Service</span> and <span>Privacy Policy</span></p>
                      </div>
                  </form>
            </div>
        </div>
    </Layout>
  )
}

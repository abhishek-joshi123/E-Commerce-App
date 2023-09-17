import React, { useContext } from "react";
import Layout from "../../Layouts/Layout";
import "../../Styles/SignIn.css";
import LoginImage from "../../Images/LoginImage.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../Contexts/CategoryContext";

 
export default function SignUp() {
  
  const host = process.env.REACT_APP_LOCAL_HOST
  const context = useContext(CategoryContext)
  const {setLoader} = context;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAdress] = useState("");
  const [answer, setAnswer] = useState("");
  const [phone, setPhone] = useState("");
  
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch(`${host}/api/auth/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        }, 
        body: JSON.stringify({name, email, password, address, phone, answer})
      })

      const json = await response.json()
      
      if(json.success){
        navigate('/sign-in')
        toast.success(json.message)
      }
      else{
        if(json.Esuccess)
        toast.error(json.errors[0].msg)
      else
      toast.error(json.message)
  }
    setLoader(false);
    
  } catch (error) {
        toast.error("Something went wrong");
        setLoader(false);
    }
  };
  
  return (
    <Layout title={"Sign-up Ecommerce App"}>
      <div className="SignIn-div">
        <div className="SignIn-RightDiv">
          <img src={LoginImage} alt="" />
        </div>
        <div className="SignIn-LeftDiv">
          <form onSubmit={HandleSubmit}>
            <div className="Form-Heading">
              <h1>Sign Up</h1>
            </div>
            <div className="SignIn-inputs">
              <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <input
                type="email"
                placeholder="Enter email here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <input
                type="password"
                placeholder="password should contain atleast 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <input
                type="text"
                placeholder="Enter your complete address"
                value={address}
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
                required
              />
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
              <input
                type="text"
                placeholder="Enter your favourite sport"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                required
              />
            </div>
            <div className="Login-btn">
              <button className='Log-btn' onClick={HandleSubmit}>Sign Up</button>
              <p className="Login-last-para">
                By Signing up you agree to Ajio's <span>Terms of Service</span>{" "}
                and <span>Privacy Policy</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

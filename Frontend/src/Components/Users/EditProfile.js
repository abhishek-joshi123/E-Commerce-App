import React, { useState } from 'react'
import '../../Styles/EditProfile.css'
import { useAuth } from '../Contexts/Auth'
import { toast } from 'react-toastify'


export default function EditProfile() {

  const [auth, setAuth] = useAuth()
  const {user} = auth

  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [click, setClick] = useState(false)

  const handleEditClick = () => {
    if(click) {
      setName(user?.name)
      setEmail(user?.email)
      setPhone(user?.phone)
      setAddress(user?.address)
    }
    setClick(!click)
  }

  const UpdateUser = async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/update-details', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': auth?.token
      }, 
      body: JSON.stringify({name: name, phone:phone, email:email, address:address}) 
    })
    const json = await response.json()
    if(json.success){
      setAuth({...auth, user: json.user})
      let ls = localStorage.getItem('auth')
      ls = JSON.parse(ls)
      ls.user = json.user
      localStorage.setItem('auth', JSON.stringify(ls))
      toast.success(json.message)
    }
    else{
      if(json.Esuccess)
        toast.error(json.errors[0].msg)
      else
        toast.error(json.message)
    }
  }

  return (
    <div className='Edit-div'>
      <h1 className='Edit-heading'>Personal Information</h1>
      <p className='Edit-para'>Hey there! Fill in your details for a personalized AJIO shopping experience.</p>
      <span className='Edit-Edit-btn' onClick={handleEditClick}>{click ? 'Cancel' : 'Edit'}</span>
      <form className='Edit-form'>
            <div className='Form-Edit-div'>
                <label htmlFor="name">Full name</label>
                <input type="text"  id="name" name="name" value={name} onChange={(e) => {setName(e.target.value)}} required />
            </div>
            <div  className='Form-Edit-div'>
                <label htmlFor="email">Email Address</label>
                <input type="email"  id="email" name="email"  value={email} onChange={(e) => {setEmail(e.target.value)}} style={{color: !click ? '#999' : '#333'}} disabled={!click} required  />
            </div>
            <div  className='Form-Edit-div'>
                <label htmlFor="number">Mobile Number</label>
                <input type="number"  id="number" name="number"  value={phone} onChange={(e) => {setPhone(e.target.value)}} style={{color: !click ? '#999' : '#333'}} disabled={!click} required />
            </div>
            <div  className='Form-Edit-div'>
                <label htmlFor="address">Address</label>
                <input type="text"  id="address" name="address"  value={address} onChange={(e) => {setAddress(e.target.value)}} style={{color: !click ? '#999' : '#333'}} disabled={!click} required />
            </div>

            <button className='Update-Submit' onClick={UpdateUser} >UPDATE CHANGES</button>
        </form>
    </div>
  )
}

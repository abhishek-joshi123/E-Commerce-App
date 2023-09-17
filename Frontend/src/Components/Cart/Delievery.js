
import React, { useContext, useState } from 'react'
import Layout from '../../Layouts/Layout'
import SubTotal from './SubTotal'
import '../../Styles/Delievery.css'
import { filterAndModifyProducts, getBasketTotal, getBasketTotalDiscount, getBasketTotalPrice } from '../Contexts/Reducer'
import { useStateValue } from '../Contexts/CartContext'
import {CiLocationOn, CiDeliveryTruck} from 'react-icons/ci'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import { RxCross2 } from 'react-icons/rx';
import { useAuth } from '../Contexts/Auth'
import { toast } from 'react-toastify'
import OrderedProduct from './OrderedProduct'
import { CategoryContext } from '../Contexts/CategoryContext'


export default function Delievery() {
 
  const [auth, setAuth] = useAuth()
  const {user} = auth;
  const context = useContext(CategoryContext)
  const {deliveryDate} = context
  const [{basket}, dispatch] = useStateValue()
  const Price = getBasketTotal(basket)
  const TotalPrice = getBasketTotalPrice(basket)
  const TotalDiscount = getBasketTotalDiscount(basket)
  
  const [name, setName] = useState(user?.name)
  const [mobile, setMobile] = useState(user?.phone)
  const [pincode, setPincode] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.PinCode: '')
  const [locality, setLocality] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.Locality_Area_Street: '')
  const [flat, setFlat] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.FlatNumber_BuildingName: '')
  const [landmark, setLandmark] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.Landmark: '')
  const [city, setCity] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.City: '')
  const [district, setDistrict] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.Distict: '')
  const [SelectState, setSelectState] = useState(user?.DelieveryAddress ? user?.DelieveryAddress.State: '')
  
  const [state, setState] = useState({
      right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const inputList = (anchor) => (
    <Box
      className= 'edit-delivery-address'
      role="presentation"
    >
      <List className='Address-All-lists'>
            <div className='Delievery-Address-heading'>
                <p>Edit Address Details</p>
            <span onClick={toggleDrawer('right', false)}><RxCross2 style={{fontSize: '40px'}}/></span>
            </div>
            <TextField
              label={'name'}
              variant="outlined"
              fullWidth
              size="small"
              value={name}
              disabled={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px',
                  },
              }}
              />
            <TextField
              label={'mobile'}
              variant="outlined"
              fullWidth
              size="small"
              value={mobile}
              disabled={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'Pin Code'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={pincode}
              onChange={(e) => {setPincode(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'Locality / Area / Street'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={locality}
              onChange={(e) => {setLocality(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'Flat number / Building Name'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={flat}
              onChange={(e) => {setFlat(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'Landmark'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={landmark}
              onChange={(e) => {setLandmark(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'City'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={city}
              onChange={(e) => {setCity(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'District'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={district}
              onChange={(e) => {setDistrict(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <TextField
              label={'State'}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={SelectState}
              onChange={(e) => {setSelectState(e.target.value)}}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  width: '90%',
                  borderBottom: '1px solid #999',
                  marginLeft: '10px'
                },
              }}
            />
            <button className='Save-Adress-btn' onClick={updatedelieveryAddress}>Save Address</button>
      </List>
    </Box>
  );

  const updatedelieveryAddress = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-delivery-address', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token' : auth?.token
        },
        body: JSON.stringify({
          PinCode : pincode,
          FlatNumber_BuildingName : flat,
          Locality_Area_Street :locality,
          Landmark : landmark,
          City: city,
          Distict : district,
          State : SelectState
        })
      })
      const json = await response.json()
      if(json?.success){
        toast.success(json.message)
        setAuth({
          ...auth,
          user:json?.user,
          token:json?.auth_token
        })
        localStorage.setItem('auth', JSON.stringify(json))
      }
      else{
        if(json?.Esuccess)
        toast.error(json.errors[0].msg)
      else
          toast.error(json?.message)
      }
    } catch (error) {
      toast.error('error in updating delivery Address')
    }
  }
  
  const products = filterAndModifyProducts(basket)


  return (
    <Layout title={'Checkout | Cartopia'}>
        <div className="Cart-div">
            <div className="div-below-image">
              <div className="cart-left-div">
                 <div className='location-subheader'>
                    <span><CiLocationOn/></span>
                    <div>
                      <p className='first-delievery-para'>Delivery Address</p>
                      <p className='Second-delievery-para'>We will deliver your order to this address</p>
                    </div>
                 </div>
                 <div className="Delievery-Address-section">
                    {
                      user?.DelieveryAddress ? (
                        <div className="Delievery-Address-section-left">
                          <p className='Delievery-name'>{user?.name}</p>
                          <p className='Address-status'>Default</p>
                          <span className='All-Adresses'>{user?.DelieveryAddress?.Locality_Area_Street}</span>
                          <span className='All-Adresses'>{user?.DelieveryAddress?.Landmark}</span>
                          <span className='All-Adresses'> {user?.DelieveryAddress?.Distict} , {user?.DelieveryAddress?.state}</span>
                          <span className='All-Adresses'>India - {user?.DelieveryAddress?.PinCode}</span>
                          <p className='delievery-Contact'>Phone : <span>{user?.phone}</span></p>
                        </div>
                      ) : (
                        <div className="Delievery-Address-section-left">
                          <p className='Delievery-name'>{user?.name}</p>
                          <p className='Address-status'>Default</p>
                          <span className='All-Adresses'>{user?.address}</span>
                          <p className='delievery-Contact'>Phone : <span>{user?.phone}</span></p>
                        </div>
                      )
                    }
                    <div className="Delievery-Address-section-right">
                        <div className="COD-box">
                          <span className='COD-Box-Span'>Cash on delivery available</span>
                          <p className='COD-Box-p'>Est Delivery <span>{deliveryDate}</span></p>
                        </div>
                    </div>
                 </div>
                 <button className='Change-Address-btn' onClick={toggleDrawer('right', true)}>{user?.DelieveryAddress.PinCode ? 'Change Address' :'Add Addresss'}</button>
                  <SwipeableDrawer
                      anchor="right"
                      open={state['right']}
                      onClose={toggleDrawer('right', false)}
                      onOpen={toggleDrawer('right', true)}
                    >
                    {inputList('right')}
                  </SwipeableDrawer>
                  <div className="ordered-products">
                  <div className='location-subheader'>
                    <span><CiDeliveryTruck/></span>
                    <div>
                      <p className='first-delievery-para'>Expected Delivery</p>
                      <p className='Second-delievery-para'>Estimated delivery dates for your order</p>
                    </div>
                 </div>
                 <div className="ordered-products-list">
                    {
                      products.map((product) => {
                        return <OrderedProduct key={product.id} product={product} deliveryDate= {deliveryDate}/>
                      })
                    }
                 </div>
                </div>
              </div>
              <div className="cart-right-div">
                  <SubTotal Price={Price} TotalPrice={TotalPrice} TotalDiscount={TotalDiscount}/>
              </div>
            </div>
        </div>
    </Layout>
  )
}


import React, { useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/Payment.css'
import { useStateValue } from '../Contexts/CartContext'
import { getBasketTotal, getBasketTotalDiscount, getBasketTotalPrice } from '../Contexts/Reducer'
import SubTotal from './SubTotal'
import DropIn from "braintree-web-drop-in-react";
import { useAuth } from '../Contexts/Auth'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Payment() {

  const [{basket}, dispatch] = useStateValue()
  const Price = getBasketTotal(basket)
  const TotalPrice = getBasketTotalPrice(basket)
  const TotalDiscount = getBasketTotalDiscount(basket)

  const [open, setOpen] = useState(true);
  const [clientToken, setClientToken] = useState('')
  const [auth] = useAuth()
  const [instance, setinstance] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const MakeCartEmpty = () => {
    dispatch({
        type: 'MAKE_BASKET_EMPTY'
      })
  }


  const getPaymentGetwayToken = async() => {

    try {
      const response = await fetch('http://localhost:5000/api/product/braintree/token', {
        method: 'GET'
      } )
      const json = await response.json()
      if(json.success){
        setClientToken(json.clientToken)
      }
    } catch (error) {
        console.error(error);
    }
  }

  const handlePayment = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const response = await fetch('http://localhost:5000/api/product/braintree/payment', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'auth-token': auth?.token 
        }, 
        body: JSON.stringify({nonce, cart:basket}) 
      })
      const json = await response.json();
      if(json.ok) {
        localStorage.removeItem('basket')
        navigate('/dashboard/user/orders')
        toast.success('payment Successfull')
        MakeCartEmpty()
      } else{
        console.error(json.error);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPaymentGetwayToken()
    
  }, [auth?.token])

  const getInstance = (instance) => {
    setinstance(instance);
    setOpen(false)
  }

  return (
    <Layout title={'Payment | Cartopia'} >
      <div className="Cart-div">
            <div className="div-below-image">
              <div className="cart-left-div">
                {(clientToken && basket?.length > 0) &&
                  <div>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      vaultManager: true,
                      card: {
                        supportedNetworks: ['VISA', 'MASTERCARD', 'AMERICANEXPRESS', 'DISCOVER', 'JCB', 'DINERSCLUB']
                      },
                      // paypal: { 
                      //   flow: 'vault'
                      // }
                    }}
                    onInstance={getInstance}
                  />
                  </div>
                }
                <button className='Make-Payment-btn' onClick={handlePayment} disabled={  !instance || loading || !auth?.user} >{loading ? 'Processing' : `Pay ₹${Price+99+19} Sucerely`}</button>
              
              </div>
              <div className="cart-right-div">
                  <SubTotal Price={Price} TotalPrice={TotalPrice} TotalDiscount={TotalDiscount}/>
              </div>
            </div>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
    </Layout>
  )
}

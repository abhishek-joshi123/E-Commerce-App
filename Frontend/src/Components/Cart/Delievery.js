
import React from 'react'
import Layout from '../../Layouts/Layout'
import SubTotal from './SubTotal'
import { getBasketTotal, getBasketTotalDiscount, getBasketTotalPrice } from '../Contexts/Reducer'
import { useStateValue } from '../Contexts/CartContext'
import {CiLocationOn} from 'react-icons/ci'


export default function Delievery() {

  
  const [{basket}, dispatch] = useStateValue()
  const Price = getBasketTotal(basket)
  const TotalPrice = getBasketTotalPrice(basket)
  const TotalDiscount = getBasketTotalDiscount(basket)

  
  
  return (
    <Layout title={'Checkout | AJIO'}>
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
                    <div className="Delievery-Address-section-left">
                      <p className='Delievery-name'>Abhishek Joshi</p>
                      <p className='Address-status'>Current</p>
                      <span className='All-Adresses'>240/1a, gurudwara colony clement town,</span>
                      <span className='All-Adresses'>near sai hostel,</span>
                      <span className='All-Adresses'>dehradun, uttarakhand</span>
                      <span className='All-Adresses'>India - 248002</span>
                      <p className='delievery-Contact'>Phone : <span>8630251854</span></p>
                    </div>
                    <div className="Delievery-Address-section-right">
                        <div className="COD-box">
                          <span className='COD-Box-Span'>Cash on delivery available</span>
                          <p className='COD-Box-p'>Est Delivery <span>12 Sep</span></p>
                        </div>
                    </div>
                 </div>
                 <button className='Change-Address-btn'>Change Address</button>
              </div>
              <div className="cart-right-div">
                  <SubTotal Price={Price} TotalPrice={TotalPrice} TotalDiscount={TotalDiscount}/>
              </div>
            </div>
        </div>
    </Layout>
  )
}

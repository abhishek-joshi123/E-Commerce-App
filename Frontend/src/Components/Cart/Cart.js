
import React, { useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/Cart.css'
import CartImage from '../../Images/CartImage.jpg'
import { Link, useNavigate } from 'react-router-dom'
import SubTotal from './SubTotal'
import { filterAndModifyProducts, getBasketTotal, getBasketTotalDiscount, getBasketTotalPrice } from '../Contexts/Reducer'
import { useStateValue } from '../Contexts/CartContext'
import CartProducts from './CartProducts'


export default function Cart() { 

  const navigate = useNavigate()
  const [{basket}, dispatch] = useStateValue()
  const Price = getBasketTotal(basket)
  const TotalPrice = getBasketTotalPrice(basket)
  const TotalDiscount = getBasketTotalDiscount(basket)

  
  const filteredAndModifiedProducts = filterAndModifyProducts(basket)
  
  
  return (
    <Layout title={'Your Shopping bag | Cartopia'}>
        <div className="Cart-div">
          <div className='Cart-div-image' >
              <img src={CartImage} alt="image" />
          </div>
            <div className="div-below-image">
              <div className="cart-left-div">
                  <div className="cart-Items-Heading">
                    <span className='my-bag-span'>My bag</span>
                    <span className='quantity-span'>{`(${basket.length} item)`}</span>
                  </div>
                  {
                    basket.length == 0 ? (
                      <div className="Products-empty">
                        <div className="show-box">
                              <p>Your Shopping Bag is Empty!!</p>
                              <button className='Continue-shopping-btn' onClick={() =>{navigate('/')}}>Continue Shopping</button>
                        </div>
                    </div>
                    ) : (
                      filteredAndModifiedProducts?.map((item) => {
                        return <CartProducts key={item.id} item={item} />
                      })
                    )
                  }
              </div> 
              <div className="cart-right-div">
                  <SubTotal Price={Price} TotalPrice={TotalPrice} TotalDiscount={TotalDiscount}/>
              </div>
            </div>
        </div>
    </Layout>
  )
}

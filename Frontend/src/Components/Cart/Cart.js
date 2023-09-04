
import React, { useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/Cart.css'
import CartImage from '../../Images/CartImage.jpg'
import { Link } from 'react-router-dom'
import SubTotal from './SubTotal'
import { getBasketTotal, getBasketTotalDiscount, getBasketTotalPrice } from '../Contexts/Reducer'
import { useStateValue } from '../Contexts/CartContext'
import CartProducts from './CartProducts'


export default function Cart() {

  
  const [{basket}, dispatch] = useStateValue()
  
  const Price = getBasketTotal(basket)
  const TotalPrice = getBasketTotalPrice(basket)
  const TotalDiscount = getBasketTotalDiscount(basket)

  return (
    <Layout title={'Your Shopping bag | AJIO'}>
        <div className="Cart-div">
          <div className='Cart-div-image' >
              <img src={CartImage} alt="image" />
          </div>
            <div className="div-below-image">
              <div className="cart-left-div">
                  <div className="cart-Items-Heading">
                    <span className='my-bag-span'>My bag</span>
                    <span className='quantity-span'>{`(${basket.length} item)`}</span>
                    <Link to="/Wishlist">+  Add from Wishlist</Link>
                  </div>
                  {
                    basket?.map((item) => {
                      return <CartProducts key={item.id} item={item} />
                    })
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

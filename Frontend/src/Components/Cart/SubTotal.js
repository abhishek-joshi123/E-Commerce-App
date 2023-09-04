import React from 'react'
import '../../Styles/SubTotal.css'
import { Link } from 'react-router-dom'

export default function SubTotal(props) {

    const {Price, TotalPrice, TotalDiscount} = props;
  return (
    <div>
        <div className='SubTotal-Total-div'>
            <h3 className='SubTotal-heading'>Order Details</h3>
            <section className='Checkout-section'>
                <span className='Checkout-label'>Bag total</span>
                <span className='Checkout-priceValue'>₹{TotalPrice? TotalPrice : 0}</span>
            </section>
            <section className='Checkout-section'>
                <span className='Checkout-label'>Bag Discount</span>
                <span className='Checkout-DiscountValue'>-₹{TotalDiscount? TotalDiscount : 0}</span>
            </section>
            <section  className='Checkout-section-extra-charges'>
                <span className='Checkout-extra-fee-label'>Convenience Fee</span>
                <div className="Extra-fee">
                    <span className='extra-first-span'>Delivery Fee</span>
                    <span className='extra-Second-span'>₹99</span>
                </div>
                <div className="Extra-fee">
                    <span className='extra-first-span'>Fulfilment Fee</span>
                    <span className='extra-Second-span'>₹19</span>
                </div>
            </section>
            <section className='Checkout-All-Total-section'>
                <span className='Checkout-All-Total-label'>Order Total</span>
                <span className='Checkout-All-Total-DiscountValue'>₹{Price ? Price+19+99 : 0}</span>
            </section>
        </div>
        <button className="subTotal-shipping-button">Proceed to shipping</button>
        <div className='SubTotal-Policy-div'>
        <h3 className='SubTotal-heading'>Return/Refund policy</h3>
        <span className='policy-para'>In case of return, we ensure quick refunds. Full amount will be refunded excluding Convenience Fee</span>
        <Link className='SubTotal-policy-link' to="/policy">Read Policy</Link>
        </div>
    </div>
  )
}

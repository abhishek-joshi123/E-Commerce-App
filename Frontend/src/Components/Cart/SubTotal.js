import React from 'react'
import '../../Styles/SubTotal.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/Auth';
import { useStateValue } from '../Contexts/CartContext';

export default function SubTotal(props) {

    const {Price, TotalPrice, TotalDiscount} = props;
    const location = useLocation()
    const [auth] = useAuth()
    const {user} = auth
    const navigate = useNavigate()
    const [{basket}, dispatch] = useStateValue()
 
    const handleNavigation = () => {
        if(location.pathname === '/cart')
            navigate('/cart/delivery')
        
        else
            navigate('/cart/payment')
    }

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
                    <span className='extra-first-span'>delivery Fee</span>
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
        { 
            auth?.user ? (
                    !(location.pathname === '/cart/payment') && <button className="subTotal-shipping-button" disabled = {(location.pathname === '/cart' && basket.length === 0) || (location.pathname === '/cart/delivery' && !user?.DelieveryAddress.PinCode)} onClick={handleNavigation}>{location.pathname === '/cart' ?'Proceed to Shipping' : 'Proceed to Payment'}</button>
            ) : (
                <button className="subTotal-shipping-button" onClick={() => {navigate('/sign-in',{state:'/cart'})}}>Login to Checkout</button>
            )
        }
       {
            location.pathname === '/cart/delivery' &&  <div className="delivery-address-alert">
               { user?.DelieveryAddress.PinCode ? 
                    <span>Before you proceed with the payment, Please ensure the delivery address You entered for this order is correct or not!</span>
                    :
                    <span>Before you proceed with the payment, could you please share the full delivery address for your order</span>
                }
            </div>
       }
        {
            !(location.pathname === '/cart/delivery' || location.pathname === '/cart/payment') && <div className='SubTotal-Policy-div'>
            <h3 className='SubTotal-heading'>Return/Refund policy</h3>
            <span className='policy-para'>In case of return, we ensure quick refunds. Full amount will be refunded excluding Convenience Fee</span>
            <Link className='SubTotal-policy-link' to="/policy">Read Policy</Link>
            </div>
        }
    </div>
  )
}

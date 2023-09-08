import React, { useContext } from 'react'
import '../../Styles/SubTotal.css'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CategoryContext } from '../Contexts/CategoryContext';

export default function SubTotal(props) {

    const {Price, TotalPrice, TotalDiscount} = props;
    const context = useContext(CategoryContext)
    const {activeStep, handleNext} = context
    const location = useLocation()

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
        <React.Fragment>
            <Box className="subTotal-shipping-button">
                <Box sx={{ flex: '1 1 auto' }} />
                <Button sx={{color: '#fff', fontSize: '14px', fontWeight: '600'}}  onClick={handleNext}>
                {activeStep === 0 ? 'Proceed to shipping' : 'Proceed to Payment'}
                </Button>
            </Box>
        </React.Fragment>
        {
            !(location.pathname === '/cart/delievery') && <div className='SubTotal-Policy-div'>
            <h3 className='SubTotal-heading'>Return/Refund policy</h3>
            <span className='policy-para'>In case of return, we ensure quick refunds. Full amount will be refunded excluding Convenience Fee</span>
            <Link className='SubTotal-policy-link' to="/policy">Read Policy</Link>
            </div>
        }
    </div>
  )
}

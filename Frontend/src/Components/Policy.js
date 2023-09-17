import React from 'react'
import Layout from '../Layouts/Layout'
import '../Styles/Policy.css'
import PolocyImage from '../Images/PolocyImage.jpg'
import { Link } from 'react-router-dom'

export default function Policy() {
  return (
    <Layout title = {'Policies - privacy, fees and refunds'}>
        <div className="Policy-Div">
        <div className="Policy-details">
            <div className="Policy-right">
                <img src={PolocyImage} alt="failed" />
            </div>
            <div className="Policy-left">
              <div className="Policy-heading"><h1> OUR POLICY</h1></div>
              <p>any query and information about product feel free to call anytime we are free 24/7 available</p>
              <li><Link to="terms and conditions" > Terms and Conditions</Link></li>
              <li><Link to="respect privacy">We respect your Privacy</Link></li>
              <li><Link to="fees and payments">Fees and Payments</Link></li>
              <li><Link to="returns and refunds">Returns and Refunds Policy</Link></li>
            </div>
          </div>'<div className="Policy-About">
            <div><h2 className='Down-Heading'>Who is CARTOPIA?</h2></div>
            <p> CARTOPIA is a retail company which offers various retail solutions, including, through its website www.cartopia.com, and its mobile and tablet applications (“Platforms”), various online lifestyle, fashion and electronics solutions, which inter alia facilitate the sale and purchase of electronics, toys, and lifestyle and fashion merchandise (“Products”) by users of the Platforms (“Users”).With the trendiest, freshest, and most unique styles from across India and the world, CARTOPIA invites you to express your personal style fearlessly, and with a confidence and optimism that cannot be easily shaken.Why let a world that loves to police your wardrobe and your expression get the upper hand, anyway?So the next time someone says ‘Oh, that dress is too bold’ ‘Are you sure you’re the right size for this?’ ‘Maybe you should pick a colour that suits you’ or ‘Act your age and wear something else’, go ahead and do exactly what you please. When it comes to great style and personal expression, there should never be any regrets.</p>
          </div>'
        </div>
    </Layout>
  )
}

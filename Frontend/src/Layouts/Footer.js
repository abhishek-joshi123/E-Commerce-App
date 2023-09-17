import React from 'react'
import '../Styles/Footer.css'
import footerImage2 from '../Images/FooterImage2.png'
import {GiCardExchange} from 'react-icons/gi'
import {RiHandHeartLine} from 'react-icons/ri'
import {MdOutlineGppGood} from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {

  const location = useLocation()
  return (
    <div>
      <>
        <footer>
          <div className="firstSection">
            {(location.pathname === '/cart' || location.pathname === '/cart/delievery') && <div className= 'Footer-Payment-Heading'>
              <img src={footerImage2} alt="Not Loaded" />
            </div>}
          </div>
          <div className='footer-images'>
            <div><GiCardExchange/></div>
            <div><RiHandHeartLine/></div>
            <div><MdOutlineGppGood/></div>
          </div>
          <div className='lastSection'>
                <p>&copy; Copyright 2023 all rights reserved</p>
                <div id='links'>
                  <Link to="/about">about</Link>
                  <Link to="/contact">contact</Link>
                  <Link to="/policy">policy</Link>
                </div>
          </div>
        </footer>
      </>
    </div>
  )
}

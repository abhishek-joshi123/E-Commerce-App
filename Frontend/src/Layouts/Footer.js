import React from 'react'
import '../Styles/Footer.css'
import footerImage from '../Images/footerImage.jpg'
import {GiCardExchange} from 'react-icons/gi'
import {RiHandHeartLine} from 'react-icons/ri'
import {MdOutlineGppGood} from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <>
        <footer>
          <div className="firstSection">
            <img className= 'Footer-Heading' src={footerImage} alt="Not Loaded" />
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

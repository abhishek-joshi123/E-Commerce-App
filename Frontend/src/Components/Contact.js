import React from 'react'
import Layout from '../Layouts/Layout'
import ContactImage from '../Images/ContactImage.png'
import '../Styles/Contact.css'
import {MdOutlineMailLock} from 'react-icons/md'
import {FiPhoneCall} from 'react-icons/fi'
import {LuInstagram} from 'react-icons/lu'
import {PiTelegramLogo} from 'react-icons/pi'
import {AiOutlineLinkedin} from 'react-icons/ai'

export default function Contact() {
  return (
    <Layout title = {'Contact us - We are 24/7 available'} >
      <div className="Contact-Div">
          <div className="Contact-details">
            <div className="Contact-right">
                <img src={ContactImage} alt="failed" />
            </div>
            <div className="Contact-left">
              <div className="Contact-heading"><h1>CONTACT US</h1></div>
              <p>any query and information about product feel free to call anytime we are free 24/7 available</p>
              <p><a href="https://mail.google.com/mail"  target='_blank'><MdOutlineMailLock/> : abhishekjoshi3636829@gmail.com</a></p>
              <p><FiPhoneCall/> : +91 8630251854</p>
              <p><a href="https://instagram.com/abhi_joshi_19?igshid=MzNlNGNkZWQ4Mg==" target='_blank' alt="failed to load" ><LuInstagram/> www.instagram.com</a></p>
              <p><a href="https://telegram.me/Abhishek_Joshi_123" target='_blank' alt="failed to load" ><PiTelegramLogo/> www.telegram.com </a></p>
              <p><a href="https://www.linkedin.com/in/abhishek-joshi-a725a8226" target='_blank' alt="failed to load"><AiOutlineLinkedin/> www.linkedin.com</a></p>
            </div>
          </div>
          <div className="Contact-About">
            <div><h2 className='Down-Heading'>Cartopia Help Center | 24x7 Customer Care Support</h2></div>
            <p>The Cartopia Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and you can go back to shopping online. For example, you can get more information regarding order tracking, delivery date changes, help with returns (and refunds), and much more. The cartopia Help Centre also lists out more information that you may need regarding cartopia Plus, payment, shopping, and more. The page has various filters listed out on the left-hand side so that you can get your queries solved quickly, efficiently, and without a hassle. You can get the cartopia Help Centre number or even access cartopia Help Centre support if you need professional help regarding various topics. The support executive will ensure speedy assistance so that your shopping experience is positive and enjoyable. You can even inform your loved ones of the support page so that they can properly get their grievances addressed as well. Once you have all your queries addressed, you can pull out your shopping list and shop for all your essentials in one place. You can shop during festive sales to get your hands on some unbelievable deals online. This information is updated on 20-Jul-23</p>
          </div>
      </div>
    </Layout>
  )
}

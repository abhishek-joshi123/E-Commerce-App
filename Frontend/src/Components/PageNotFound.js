import React from 'react'
import Layout from '../Layouts/Layout'
import '../Styles/PageNotFound.css'
import dog from '../Images/dog.png'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

export default function PageNotFound() {
  return (
    <Layout title = {'Go back - Page Not Found'}>
      <div className="Pagenotfound-div">
        <div className="PageNotFound-right">
            <img src={dog} alt="Not loaded" />
        </div>
        <div className="PageNotFound-left">
              <h1>404 Page Not Found</h1>
              <p>Sorry, but we can't find the page you are looking for...</p>
              <Link to="/"><button class="image-button"><FaHome style={{fontSize: '16px', marginLeft: '5px', paddingTop: '3px'}}/> Back to Home</button></Link>
        </div>
      </div>
    </Layout>
  )
}

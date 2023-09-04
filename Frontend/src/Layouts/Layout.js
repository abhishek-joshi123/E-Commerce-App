import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

const Layout = (props) => {
  const {children, title, description, keywords, author} = props;

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8'/>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
        <meta name='author' content= {author}/>
        <title>{title}</title>
      </Helmet>
        <Navbar/>
          <main style={{minHeight: "70vh"}}>
            {props.children}
          </main>
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
    title: "Ecommerce App - Shop Now",
    description: "Mern Stack Project",
    keywords: "Mern, React, Express, Mongodb, Node",
    author: "Abhishek Joshi"

}

export default Layout

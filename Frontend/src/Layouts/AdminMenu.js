import React from 'react'
import '../Styles/AdminMenu.css'
import { Link } from 'react-router-dom'

export default function AdminMenu() {

    const scrollToLowerDiv = () => {
        const lowerDiv = document.querySelector('.dashboard-left');
        lowerDiv.scrollIntoView({ behavior: 'smooth' });
      };

  return (
    <>
        <div className="Menu-div">
            <h1>Admin Panel</h1>
            <ul>
                <li onClick={scrollToLowerDiv}>
                    <Link to="/dashboard/admin/create-category">Create Category</Link>
                </li>
                <li onClick={scrollToLowerDiv}>
                    <Link to="/dashboard/admin/create-product">Create Product</Link>
                </li>
                <li onClick={scrollToLowerDiv}>
                    <Link to="/dashboard/admin/products">All Products</Link>
                </li>
                <li onClick={scrollToLowerDiv}>
                    <Link to="/dashboard/admin/orders">Orders</Link>
                </li>
            </ul>
    </div>
    </>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function UserMenu() {
  return (
    <>
    <div className="Menu-div">
        <h1>User Pannel</h1>
        <ul>
            <li>
                <Link to="/dashboard/user/profile">Profile</Link>
            </li>
            <li>
                <Link to="/dashboard/user/orders">Orders</Link>
            </li>
            <li>
                <Link to="/chatbot">Costumer Care</Link>
            </li>
        </ul>
    </div>
</>
  )
}

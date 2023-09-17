import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Usermenu.css'

export default function UserMenu() {
  return (
    <>
    <div className="UserMenu-div">
        <h1>User Panel</h1>
        <ul className='UserMenu-options'>
            <li>
                <Link to="/dashboard/user/profile">Profile</Link>
            </li>
            <li>
                <Link to="/dashboard/user/orders">Orders</Link>
            </li>
        </ul>
    </div>
</>
  )
}

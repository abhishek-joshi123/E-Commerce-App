import React, { useEffect, useState } from 'react'
import '../../Styles/Orders.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/Auth';
import OrderProducts from './OrderProducts';


export default function AllOrders() {
    
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth()

    const getOrders = async(req, res) => {
      try {
          const response = await fetch('http://localhost:5000/api/auth/orders', {
            method: 'GET',
            headers: {
              'auth-token': auth?.token
            }
          })
          const json = await response.json();
          if(json?.success) {
            setOrders(json.orders);
          }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getOrders()
      // eslint-disable-next-line 
    }, [])

  return (
    <div className='MyOrders-div'>
      <p>MY Orders</p>
      {
        orders.length > 0 ? (
          <div className="all-ordered-products">
            {
              orders?.map((order) => {
                return <OrderProducts key={order._id} order={order}/>
              })
            }
          </div>
        ) : (
          <div className="Products-empty">
            <div className="show-box">
                  <p>No requests for products or services have been received yet</p>
                  <button className='Start-shopping-btn' onClick={() =>{navigate('/')}}>Start Shopping</button>
            </div>
        </div>
        )
      }
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import '../../../Styles/AllUsers.css'
import { useAuth } from '../../Contexts/Auth';
import OrderProducts from './OrderProducts';

export default function Orders() {
  
  const host = process.env.REACT_APP_LOCAL_HOST
  const [orders, setOrders] = useState([]);
    const [auth] = useAuth()

    const getOrders = async(req, res) => {
      try {
          const response = await fetch(`${host}/api/auth/all-orders`, {
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
    }, [])


  return (
    <div className='All-Users-div'>
      <h1>All Orders</h1>
      {
        orders.length > 0 ? (
          <div className="all-ordered-products">
            {
              orders?.map((order) => {
                return <OrderProducts key={order._id} order={order} getOrders={getOrders}/>
              })
            }
          </div>
        ) : (
          <div className="Products-empty">
            <div className="show-box">
                  <p>No requests for products or services have been received yet</p>
            </div>
        </div>
        )
      }
    </div>
  )
}

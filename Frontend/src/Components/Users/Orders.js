 
import React from 'react'
import Layout from '../../Layouts/Layout'
import UserMenu from '../../Layouts/UserMenu'
import AllOrders from './AllOrders'

export default function Orders() {

  return (
    <Layout title = {'Dashboard - Your Orders '}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <UserMenu/>
            </div>
            <div className="dashboard-left">
              <AllOrders/>
            </div>
        </div>
    </Layout>
  )
}

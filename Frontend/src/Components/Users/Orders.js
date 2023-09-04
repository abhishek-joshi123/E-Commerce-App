
import React from 'react'
import Layout from '../../Layouts/Layout'
import UserMenu from '../../Layouts/UserMenu'

export default function Orders() {
  return (
    <Layout title = {'Dashboard - Your Orders '}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <UserMenu/>
            </div>
            <div className="dashboard-left">
              <h1>orders</h1>
            </div>
        </div>
    </Layout>
  )
}

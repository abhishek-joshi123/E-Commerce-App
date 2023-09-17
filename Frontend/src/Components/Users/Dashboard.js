import React from 'react'
import Layout from '../../Layouts/Layout'
import UserMenu from '../../Layouts/UserMenu'
import '../../Styles/Dashboard.css'
import EditProfile from './EditProfile'

export default function Dashboard() {

  return (
    <Layout title= {'DashBoard - Ecommerce App'}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <UserMenu/>
            </div>
            <div className="dashboard-left">
            <EditProfile/>
            </div>
        </div>
    </Layout>
  )
}

import React from 'react'
import Layout from '../../Layouts/Layout'
import UserMenu from '../../Layouts/UserMenu'
import EditProfile from './EditProfile'

export default function Profile() {

  return (
    <Layout title = {'Dashboard - Your Profile '}>
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

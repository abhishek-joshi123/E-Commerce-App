import React from 'react'
import Layout from '../../Layouts/Layout'
import UserMenu from '../../Layouts/UserMenu'

export default function Profile() {

  return (
    <Layout title = {'Dashboard - Your Profile '}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <UserMenu/>
            </div>
            <div className="dashboard-left">
              <h1>profile</h1>
            </div>
        </div>
    </Layout>
  )
}

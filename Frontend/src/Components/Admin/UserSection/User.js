import React from 'react'
import Layout from '../../../Layouts/Layout'
import AdminMenu from '../../../Layouts/AdminMenu'
import Users from './Users'

export default function User() {
  return (
    <Layout title = {'Dashboard - All Users'}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/>
            </div>
            <div className="dashboard-left">
                <Users/>
            </div>
        </div>
    </Layout>
  )
}

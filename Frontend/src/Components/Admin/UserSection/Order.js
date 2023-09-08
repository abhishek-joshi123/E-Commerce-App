import React from 'react'
import Layout from '../../../Layouts/Layout'
import AdminMenu from '../../../Layouts/AdminMenu'
import Orders from './Orders'

export default function Order() {
  return (
    <Layout title = {'Dashboard - All Users'}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/>
            </div>
            <div className="dashboard-left">
                <Orders/>
            </div>
        </div>
    </Layout>
  )
}

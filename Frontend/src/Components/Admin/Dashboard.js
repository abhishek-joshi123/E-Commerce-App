import React from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/Dashboard.css'
import AdminMenu from '../../Layouts/AdminMenu'
import { useAuth } from '../Contexts/Auth'

export default function AdminDashboard() {

  const [auth] = useAuth()
  return (
    <Layout title = {'ECommerce App - Admin Dashboard'}>
        <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/>
            </div>
            <div className="dashboard-left">
              <div className="Default-Div">
              <div> Admin name : <p>{auth?.user?.name}</p></div>
              <div> Admin Email : <p>{auth?.user?.email}</p></div>
              <div> Admin Contact : <p>{auth?.user?.phone}</p></div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

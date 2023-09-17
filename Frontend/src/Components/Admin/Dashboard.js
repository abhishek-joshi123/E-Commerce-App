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
              <p> Admin name : <span>{auth?.user?.name}</span></p>
              <p> Admin Email : <span>{auth?.user?.email}</span></p>
              <p> Admin Contact : <span>{auth?.user?.phone}</span></p>
              </div>
            </div>
        </div>
    </Layout>
  )
}

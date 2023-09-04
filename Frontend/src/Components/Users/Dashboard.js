import React from 'react'
import Layout from '../../Layouts/Layout'
import UserMenu from '../../Layouts/UserMenu'
import '../../Styles/Dashboard.css'
import { useAuth } from '../Contexts/Auth'

export default function Dashboard() {

  const [auth] = useAuth()
  return (
    <Layout title= {'DashBoard - Ecommerce App'}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <UserMenu/>
            </div>
            <div className="dashboard-left">
              <div className="Default-Div">
              <div> User name : <p>{auth?.user?.name}</p></div>
              <div> User Email : <p>{auth?.user?.email}</p></div>
              <div> User Contact : <p>{auth?.user?.phone}</p></div>
              <div> User Address : <p>{auth?.user?.address}</p></div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

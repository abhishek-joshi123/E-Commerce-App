import React from 'react'
import Layout from '../../../Layouts/Layout'
import AdminMenu from '../../../Layouts/AdminMenu'
import GetAllprodcts from './GetAllprodcts'

export default function Products() {
  return (
    <Layout title = {'Dashboard - All Products'}>
        <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/> 
            </div>
            <div className="dashboard-left">
                <GetAllprodcts/>
            </div>
        </div>
    </Layout>
  )
}


import React from 'react'
import Layout from '../../../Layouts/Layout'
import AdminMenu from '../../../Layouts/AdminMenu'
import AddProduct from './AddProduct.js'

export default function AdminProduct() {
  return (
    <Layout title = {'Dashboard - Create Products'}>
        <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/> 
            </div>
              <div className="dashboard-left">
                <AddProduct/>
              </div>
            
        </div>
    </Layout>
  )
}

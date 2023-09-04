import React from 'react'
import Layout from '../../../Layouts/Layout'
import AdminMenu from '../../../Layouts/AdminMenu'
import AddCategory from './AddCategory.js'
import AllCategories from './AllCategories.js'


export default function AdminCategory() {

  return (
    <Layout title = {'Dashboard - Categories'}>
      <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/>
            </div>
              <div className="dashboard-left">
                <AddCategory/>
                <AllCategories/>
              </div> 
        </div>
    </Layout>
  )
}

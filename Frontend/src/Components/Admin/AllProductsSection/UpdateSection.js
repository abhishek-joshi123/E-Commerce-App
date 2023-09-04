
import React from 'react'
import Layout from '../../../Layouts/Layout'
import AdminMenu from '../../../Layouts/AdminMenu'
import { CategoryState } from '../../Contexts/CategoryContext'
import UpdateorDelete from './UpdateAorDelteProduct'

export default function UpdateSection() {
  return (
    <Layout titl={'Dashboard - Update or Delete Product'}>
        <div className="dashboard-div">
            <div className="dashboard-right">
                <AdminMenu/> 
            </div>
            <CategoryState>
              <div className="dashboard-left">
                <UpdateorDelete/>
              </div>
            </CategoryState>
            
        </div>
    </Layout>
  )
}

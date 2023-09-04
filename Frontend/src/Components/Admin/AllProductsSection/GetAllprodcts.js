
import React, { useContext, useEffect } from 'react'
import '../../../Styles/GetAllProducts.css'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from './ProductCard'
import { CategoryContext } from '../../Contexts/CategoryContext'

export default function GetAllprodcts() {

    const navigate = useNavigate()
    const context = useContext(CategoryContext)
    const {Product, ShowAllProducts} = context;

    useEffect(() => { 

        if(localStorage.getItem('auth')){
            ShowAllProducts()
        }
        else{
          navigate('/sign-in')
        }

        // eslint-disable-next-line 
      }, []) 


    return (
        <div className='All-Products-div'>
        <h1>All Products</h1>

        <div className="AllProducts-div">
            {
                Product?.map((product) => {
                    return <Link key={product._id} to={`/dashboard/admin/products/${product.slug}`} className='get-Single-product'>
                        <ProductCard product={product}/>
                    </Link>
                })
            }
        </div>
        </div>
    )
}


import React, { useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/ProductDetails.css'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import {BiShoppingBag} from 'react-icons/bi'
import {CiLocationOn} from 'react-icons/ci'
import { useStateValue } from '../Contexts/CartContext'


export default function ProductDetails() {
    
    const [Product, setProduct] = useState([])
    const params = useParams()
    const {slug} = params

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line 
    },[])

    const getProduct = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/get-product/${slug}`, {
                method: 'GET',
            })

            const json = await response.json()
            if(json?.success){
                setProduct(json.product)
            }
        } catch (error) {
            toast.error('something went Wrong')
        }
    }
    
    const [{basket}, dispatch] = useStateValue()

    const AddToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: 'ADD_TO_BASKET',
          item: {
            id: Product._id,
            name: Product.name,
            slug: Product.slug,
            description: Product.description,
            price: Product.price,
            discount: Product.discount
          }
        })
        toast.success(`${Product.name.split(' ').slice(0,2).join(' ')} added to cart`)
    }

  return (
    <Layout>
        <div className="ProductDetails-div">
            <div className="ProductDetails-left">
                <img src={`http://localhost:5000/api/product/product-image/${Product?._id}`} alt='image' />
            </div>
            <div className="ProductDetails-right">
                <h2>{Product?.name}</h2>
                <p className='product-desc'>{Product?.description}</p>
                <p className='product-price'>₹{Product?.price}</p>
                <p className='product-discount'>MRP₹{Math.floor((Product.price * 100)/(100 - Product.discount))} ({Product.discount}% OFF)</p>
                <span>Price inclusive of all taxes</span>
                <p className='Product-select-size'>Select Size</p>
                <div className="select-size-buttons">
                    <button>XS</button>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <button>XL</button>
                    <button>XXL</button>
                    <button>3XL</button>
                </div>
                <div className='select-size-alert'>
                    <CiLocationOn style={{marginRight: "5px"}}/>Select your size to know your estimated delivery date.
                </div>
                <div className="Product-details-Butttons">
                    <button className='Product-Bag-btn' onClick={AddToBasket}><BiShoppingBag/> Add To Bag</button>
                    <div className='Product-details-Butttons-div'>HANDPICKED STYLES | ASSURED QUALITY</div>
                    <button className='Product-detail-btn'>Buy Now</button>
                </div>
            </div>
        </div>
    </Layout>
  )
}

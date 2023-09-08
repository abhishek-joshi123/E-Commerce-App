
import React from 'react'
import {BiShoppingBag} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../Contexts/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard(props) {

    const {product} = props;
    const navigate = useNavigate()
    const [{basket}, dispatch] = useStateValue()

    const AddToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: 'ADD_TO_BASKET',
          item: {
            id: product._id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discount: product.discount,
            Quantity: 1
          }
        })
        toast.success(`${product.name.split(' ').slice(0,2).join(' ')} added to cart`)
    }
 
  return (
    <div className='Product-card-home-page'>
        <img src={`http://localhost:5000/api/product/product-image/${product._id}`} alt="image" />
            <div className="Product-content-home-pagge">
                <div className='Product-name'>{product.name.substring(0,20)}...</div>
                <div className='Product-description'>{product.description.substring(0,30)}...</div>
                <div className="Product-price">₹{product.price}</div>
                <div className="Product-Buttons">
                  <button className='Bag-btn' onClick={AddToBasket}><BiShoppingBag/> Add To Bag</button>
                </div>
                <div className="Product-Buttons">
                  <button className='detail-btn' onClick={() => {navigate(`/product/${product.slug}`)}}>Product Details</button>
                </div>
            </div>
    </div>
  )
}

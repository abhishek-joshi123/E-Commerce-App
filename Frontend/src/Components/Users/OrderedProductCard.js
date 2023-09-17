
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function OrderedProductCard(props) {

    const host = process.env.REACT_APP_LOCAL_HOST
    const navigate = useNavigate();
    const {product} = props;
    const {name, slug, price} = product;
    return (
        <div className='ordered-product2' onClick={() => {navigate(`/product/${slug}`)}}>
        <img src={`${host}/api/product/product-image/${product._id}`} alt="image" />
            <div className='ordered-product-div'>
            <p>{name.split(' ').slice(0,4).join(' ')}</p>
            <span className='ordered-product-price'>₹{price}</span>
            </div>
        </div>
    )
}

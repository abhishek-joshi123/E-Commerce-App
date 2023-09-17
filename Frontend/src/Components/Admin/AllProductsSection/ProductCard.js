
import React from 'react'
import '../../../Styles/ProductCard.css'

export default function ProductCard(props) {

    const host = process.env.REACT_APP_LOCAL_HOST
    const {product} = props;

    return (
        <div className='Product-Card-div'>
            <img src={`${host}/api/product/product-image/${product._id}`} alt="image" />
            <div className="Product-content">
                <h2>{product.name.substring(0, 15)}...</h2>
                <p>{product.description.substring(0, 25)}...</p>
            </div>
        </div>
    )
}

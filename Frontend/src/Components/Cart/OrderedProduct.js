import React from 'react'

export default function OrderedProduct(props) {

  const host = process.env.REACT_APP_LOCAL_HOST
    const {product, deliveryDate} = props
    const {id, name} = product
    
  return (
    <div className='ordered-product'>
        <img src={`${host}/api/product/product-image/${id}`} alt="image" />
        <div className='ordered-product-name-div'>
            <span>{deliveryDate}</span>
            <p>{name}</p>
        </div>
    </div>
  )
}

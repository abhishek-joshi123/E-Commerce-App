
import React from 'react'

export default function Pricebox(props) {
  
    const {price, setRadio} = props;

    return (
    <div className='Home-price-section'>
        <input type="radio" id={price.name} value={JSON.stringify(price.array)} name='radiobtn' onChange={(e) => setRadio(JSON.parse(e.target.value))}/>
        <label htmlFor={price.name}>{price.name}</label>
    </div>
  )
}

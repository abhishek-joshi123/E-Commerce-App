

import React from 'react'

export default function CategoryBox(props) {
    const {category, checked,  setChecked} = props;

    const handleChecked = (value, id) => {
      let all = [...checked]

      if(value){
        all.push(id)
      }
      else{
        all = all.filter(c => c !== id)
      }
      setChecked(all)
    }

  return (
    <div className='Home-category-section'>
      <input type="checkbox" id={category.name}value={category.name} onChange={(e) => {handleChecked(e.target.checked, category._id)}}/>
      <label htmlFor={category.name}>{category.name}</label>
    </div>
  )
}

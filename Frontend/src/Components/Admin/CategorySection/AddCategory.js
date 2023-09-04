import React, { useContext, useState } from 'react'
import '../../../Styles/AddCategory.css'
import { useAuth } from '../../Contexts/Auth'
import {toast} from 'react-toastify'
import { CategoryContext } from '../../Contexts/CategoryContext'


export default function AdminCategory() {

  const [name, setName] = useState('')
  const [auth] = useAuth()
  const context = useContext(CategoryContext)
  const {GetAllCategories} = context

  const HandleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/category/create-category`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'auth-token': auth?.token
        }, 
        body: JSON.stringify({name: name}) 
      })

      const json = await response.json()

      if(json?.success) {
        GetAllCategories()
        setName('')
        toast.success(json.message)
      }
      else{
        if(json?.Esuccess)
        toast.error(json.errors[0].msg)
      else
        toast.error(json.message)
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
}

  return ( 
        <div className="Category-div">
          <h1>Categories</h1>
          <form className='Adding-category-form' onSubmit={HandleSubmit}>
            <input type="text" placeholder='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
            <button onClick={HandleSubmit}>Add Category</button>
          </form>
          
        </div>
  )
}

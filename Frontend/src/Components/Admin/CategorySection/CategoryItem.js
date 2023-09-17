
import React, { useContext } from 'react'
import '../../../Styles/Categoryitem.css'
import {toast} from 'react-toastify'
import { useAuth } from '../../Contexts/Auth'
import { CategoryContext } from '../../Contexts/CategoryContext'

export default function CategoryItem(props) {

    const host = process.env.REACT_APP_LOCAL_HOST
    const {category, setClick, setName, setCategoryId} = props
    const [auth] = useAuth()
    const context = useContext(CategoryContext)
    const {GetAllCategories} = context

    const HandleEdit = (e) => {
      e.preventDefault();
      setClick(true)
      setName(category.name)
      setCategoryId(category._id)
    }

    const HandleDelete = async(e) => {
        e.preventDefault();
  
        try {
          const response = await fetch(`${host}/api/category/delete-category/${category?._id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'auth-token': auth?.token
            }
          })
  
          const json = await response.json()
  
          if(json?.success) {
            toast.success(json.message)
            GetAllCategories()
          }
          else{
            toast.error(json.message)
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
    }

    return (   
        <div className='CategoryItem-div'>
                <div className='category-name'>{category.name}</div>
                <div className='category-operations'>
                    <button className='Operation-buttons edit-btn' onClick={HandleEdit}>Edit</button>
                    <button className='Operation-buttons delete-btn' onClick={HandleDelete}>Delete</button>
                </div>
        </div>
    )
}

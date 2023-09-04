import React, { useEffect, useContext, useState } from 'react'
import '../../../Styles/AllCategories.css'
import { useNavigate } from 'react-router-dom'
import CategoryItem from './CategoryItem.js'
import { CategoryContext } from '../../Contexts/CategoryContext'
import {RxCross2} from 'react-icons/rx'
import { useAuth } from '../../Contexts/Auth'
import {toast} from 'react-toastify'


export default function AllCategories() {

  const [name, setName] = useState('')
  const [click, setClick] = useState(false)
  const [CategoryId, setCategoryId] = useState('')
  const navigate = useNavigate()
  const context = useContext(CategoryContext)
  const {categories, GetAllCategories} = context
  const [auth] = useAuth()

  useEffect(() => { 

    if(localStorage.getItem('auth')){
      GetAllCategories()
    }
    else{
      navigate('/sign-in')
    }
    // eslint-disable-next-line 
  }, []) 

  const handleCross = (e) => {
      e.preventDefault();
      setClick(false);
  }

    const HandleEditCategory = async(e) => {
        e.preventDefault();

        try {
          const response = await fetch(`http://localhost:5000/api/category/update-category/${CategoryId}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'auth-token': auth?.token
            },
            body: JSON.stringify({name: name}) 
          })

          const json = await response.json()
          if(json?.success) {
            toast.success(json.message)
            setClick(false)
            GetAllCategories()
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
      <div className='All-Category-div'>   
          {click && <div className='EditCategory-div'>
            <div className="EditCategory-modal">
              <div className='EditCross-div'><button onClick={handleCross}><RxCross2/></button></div>
              <h1>Edit Cateogory</h1>
              <form className='Edit-category-form'>
                <input type="text" placeholder='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                <button onClick={HandleEditCategory}>Edit Category</button>
              </form>
            </div>
          </div>}
          {
            categories?.map((category) => {
                return <CategoryItem key={category._id} category = {category} setClick={setClick} setName={setName} setCategoryId={setCategoryId}/>
            })
          }
      </div>
    )
  }

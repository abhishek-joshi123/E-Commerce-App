import React, { useContext, useEffect, useState } from 'react'
import '../../../Styles/Addproduct.css'
import {CategoryContext} from '../../Contexts/CategoryContext'
import { useNavigate } from 'react-router-dom'
import AddImage from './AddImage.js'
import {toast} from 'react-toastify'
import { useAuth } from '../../Contexts/Auth'
import {Select} from 'antd'
const {Option} = Select

export default function AddProduct() {

    const [Categoryname, setCategoryName] = useState('')
    const [Image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const context = useContext(CategoryContext)
    const {categories, GetAllCategories} = context
    const navigate = useNavigate()
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

      const handleProduct = async(e) => {
          e.preventDefault();

          try {
            
            const Productdata = new FormData()
            Productdata.append("name", name)
            Productdata.append("image", Image)
            Productdata.append("category", Categoryname)
            Productdata.append("description", description)
            Productdata.append("price", price)
            Productdata.append("discount", discount)
            Productdata.append("quantity", quantity)
            Productdata.append("shipping", shipping)
            const response = await fetch('http://localhost:5000/api/product/create-product', {
              method: 'POST',
              headers: {
                'auth-token': auth?.token
              },
              body: Productdata
            })

            const json = await response.json()

            if(json?.success) {
              toast.success(json.message)
              navigate('/dashboard/admin/products')
            }
            else{
              toast.error(json.message)
            }
          } catch (error) {
              toast.error("Something went wrong");
          }
      }

    return (
        <div className="Product-div">
        <h1>Create Product</h1>
        <Select className='Category-select-dropdown' bordered={false} placeholder='Select the Category' showSearch onChange={(value) => {setCategoryName(value)}} required>
            <Option value="">Select the Category</Option>
            {categories?.map((category) => (
                <Option key={category._id} value={category._id} >{category.name}</Option>    
            ))}
        </Select> 
        <AddImage Image={Image} setImage={setImage}/>
        <input type="text" placeholder='Enter name' value={name} onChange={(e) => {setName(e.target.value)}} className='Product-input' required/>
        <textarea cols="30" rows="5" placeholder='Enter description' value={description} onChange={(e) => {setDescription(e.target.value)}} className='Product-input' required></textarea>
        <input type="number" placeholder='Enter price' value={price} onChange={(e) => {setPrice(e.target.value)}} className='Product-input' required/>
        <input type="number" placeholder='Enter discount' value={discount} onChange={(e) => {setDiscount(e.target.value)}} className='Product-input' required/>
        <input type="number" placeholder='Enter quantity' value={quantity} onChange={(e) => {setQuantity(e.target.value)}} className='Product-input' required/>
        <Select className='Category-select-dropdown' bordered={false} placeholder='Select the Shipping' showSearch onChange={(value) => {setShipping(value)}} required>
          <Option value={1}>yes</Option>
          <Option value={0}>no</Option>
        </Select>
        <button className='Adding-product-btn' onClick={handleProduct}>Create Product</button>
        </div>
    )
}
import React, { useContext, useEffect, useState } from 'react'
import '../../../Styles/Addproduct.css'
import {CategoryContext} from '../../Contexts/CategoryContext'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useAuth } from '../../Contexts/Auth'
import UpdateImage from './UpdateImage'
import {Select} from 'antd'
const {Option} = Select

export default function UpdateorDelete() {

  const host = process.env.REACT_APP_LOCAL_HOST
    const [id, setId] = useState('')
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
    const params = useParams()
    const {slug} = params

    useEffect(() => { 

        if(localStorage.getItem('auth')){
          GetAllCategories()
          getSingleProduct()
        }
        else{
          navigate('/sign-in')
        } 
        // eslint-disable-next-line 
      }, []) 


      const getSingleProduct = async () => {
            const response = await fetch(`${host}/api/product/get-product/${slug}`, {
                method: 'GET',
                headers: {
                    'auth-token': auth?.token
                }
            })

            const json = await response.json()

            if(json?.success){
                setName(json?.product.name)
                setDescription(json?.product.description)
                setPrice(json?.product.price)
                setDiscount(json?.product.discount)
                setQuantity(json?.product.quantity)
                setCategoryName(json?.product.category._id)
                setShipping(json?.product.shipping ? 'yes' : 'no')
                setId(json?.product._id)
            }
            else{
                toast.error(json.message);
            }
        try {
            
        } catch (error) {
            toast.error('something went wrong')
        }
      }

      const HandleUpdate = async(e) => {
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
            const response = await fetch(`${host}/api/product/update-product/${id}`, {
              method: 'PUT',
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
          
          const HandleDelete = async() => {
            
            
        try {

          const response = await fetch(`${host}/api/product/delete-product/${id}`, {
            method: 'DELETE',
            headers: {
              'auth-token': auth?.token
            }
          })

          const json = await response.json();
          console.log(json);
          if(json?.success){
              toast.success(json.message);
              navigate('/dashboard/admin/products')
          }
          else{
            toast.error(json.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }

    return (
        <div className="Product-div">
        <h1>Update Product</h1>
        <Select className='Category-select-dropdown' bordered={false} placeholder='Select the Category' showSearch value={Categoryname} onChange={(value) => {setCategoryName(value)}} required>
            <Option value="">Select the Category</Option>
            {categories?.map((category) => (
                <Option key={category._id} value={category._id} >{category.name}</Option>    
            ))}
        </Select> 
        <UpdateImage Image={Image} setImage={setImage} id={id}/>
        <input type="text" placeholder='Enter name' value={name} onChange={(e) => {setName(e.target.value)}} className='Product-input' required/>
        <textarea cols="30" rows="5" placeholder='Enter description' value={description} onChange={(e) => {setDescription(e.target.value)}} className='Product-input' required></textarea>
        <input type="number" placeholder='Enter price' value={price} onChange={(e) => {setPrice(e.target.value)}} className='Product-input' required/>
        <input type="number" placeholder='Enter discount' value={discount} onChange={(e) => {setDiscount(e.target.value)}} className='Product-input' required/>
        <input type="number" placeholder='Enter quantity' value={quantity} onChange={(e) => {setQuantity(e.target.value)}} className='Product-input' required/>
        <Select className='Category-select-dropdown' bordered={false} placeholder='Select the Shipping' showSearch value={shipping} onChange={(value) => {setShipping(value)}} required>
          <Option value={1}>yes</Option>
          <Option value={0}>no</Option>
        </Select>
        <div className="updateandDelete-btns">
            <button className='editing-product-btn' onClick={HandleUpdate}>Update Product</button>
            <button className='deleting-product-btn' onClick={HandleDelete}>Delet Product</button>
        </div>
        </div>
    )
}

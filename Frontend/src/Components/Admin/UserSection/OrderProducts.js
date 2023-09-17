
import React, { useState } from 'react'
import moment from 'moment'
import OrderedProductCard from '../../Users/OrderedProductCard';
import {Select} from 'antd'
import { useAuth } from '../../Contexts/Auth';
const {Option} = Select

export default function OrderProducts(props) {
    const {order, getOrders} = props;
    const {products, payment, status, buyer, createdAt} = order;
    const {name, email, phone, DelieveryAddress} = buyer;
    const {PinCode, FlatNumber_BuildingName, Locality_Area_Street, Landmark, City, Distict, State} = DelieveryAddress;

    const [Status, setStatus] = useState(['Not Processed', 'Processing', 'Shipped', 'delievered', 'canceled'])
    const [changed, setChanged] = useState('')
    const [auth] = useAuth()

    const handleStatusChange = async(OrderedId, value) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/orders-status/${OrderedId}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'auth-token': auth?.token
            },
            body: JSON.stringify({status:value})
          })
          const json = await response.json();
          if(json?.success) {
            setChanged(json.orders.status)
            getOrders();
          }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='Ordered-product-div'>
            <table className='ordered-table'>
                <thead>
                    <tr className='table-head'>
                        <th scope='col'>Status</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-body'>
                        <td>
                        <Select className='Status-select-dropdown' bordered={false} placeholder='Select the Status' showSearch defaultValue={status} onChange={(value   ) => {handleStatusChange(order._id, value)}} required>
                            {Status?.map((status, index) => (
                            <Option key={index} value={status} >{status}</Option>    
                        ))}
        </Select>
                        </td>
                        <td>{moment(createdAt).fromNow()}</td>
                        <td className={`${payment.success ? 'payment-success' : 'payment-failed'}`}>{payment.success ? 'Success' : 'Failed'}</td>
                        <td>{products.length}</td>
                    </tr>
                </tbody>
            </table>
            <div className="buyer-details-div">
                <p className='buyer-details-heading'>Buyer Details</p>
                <div className="details-of-user">
                    <span>{name}</span>
                    <span className='buyer-email'>{email}</span>
                    <span>{phone}</span>
                </div>
                <div className="delivery-address-of-user">
                    <span>{FlatNumber_BuildingName}</span>
                    <span>{Locality_Area_Street}</span>
                    <span>{Landmark}</span>
                    <span>{City}</span>
                    <span>{Distict}</span>
                    <span className='buyer-pincode'>{PinCode}</span>
                    <span>{State}</span>
                </div>
            </div>
            <div className="ordered-products-list2">
                {
                    products?.map((product, index) => {
                        return <OrderedProductCard key={index} product={product}/>
                    })
                }
            </div>
    </div>
  )
}

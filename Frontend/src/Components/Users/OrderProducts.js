
import React from 'react'
import moment from 'moment'
import OrderedProductCard from './OrderedProductCard';

export default function OrderProducts(props) {
    const {order} = props;
    const {products, payment, status, createdAt} = order;

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
                        <td>{status}</td>
                        <td>{moment(createdAt).fromNow()}</td>
                        <td className={`${payment.success ? 'payment-success' : 'payment-failed'}`}>{payment.success ? 'Success' : 'Failed'}</td>
                        <td>{products.length}</td>
                    </tr>
                </tbody>
            </table>
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

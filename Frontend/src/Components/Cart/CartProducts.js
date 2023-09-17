
import React, { useEffect, useState } from 'react'
import {MdNavigateNext} from 'react-icons/md'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PolocyImage from '../../Images/PolocyImage.jpg'
import { useStateValue } from '../Contexts/CartContext';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000', 
    boxShadow: 24,
    p: 4,
};

export default function CartProducts(props) {

  const host = process.env.REACT_APP_LOCAL_HOST
  const {item} = props;
  const {id, name, slug, description, price, discount, Quantity} = item;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [{basket}, dispatch] = useStateValue()
  const handleDeleteProduct = () => {
    dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id
      })
  }

  const handleIncrement = () => {

    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        name: name,
        slug: slug,
        description: description,
        price: price,
        discount: discount,
          
      }
    })
  }

  const handleDeccrement = () => {
    dispatch({
        type: 'DECREMENT_FROM_BASKET',
        id: id
      })
  }

  return (
    <div className="Cart-product-container">
        <img src={`${host}/api/product/product-image/${id}`} alt="image" />
        <div className="product-details-cart">
        <Link to={`/product/${slug}`}>
          <strong>{name.split(' ').slice(0,4).join(' ')}</strong>
          <span>{description.split(' ').slice(0,15).join(' ')}...</span>
        </Link>
        <Button className='handle-btn-modal' onClick={handleOpen}><span className='product-quantity-select'>Qty </span>{Quantity}<MdNavigateNext style={{transform: "rotate(90deg)"}}/></Button>
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Select quantity
            </Typography>
            <Typography className='change-quantity-p' id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <button disabled={Quantity === 1} className='incOrDec' onClick={handleDeccrement}>-</button>
                <button className='change-quantity-btn'>{Quantity}</button>
                <button disabled={Quantity === 10} className='incOrDec' onClick={handleIncrement}>+</button>
            </Typography>
            </Box>
        </Modal>
          <div className="Prices-section">
              <div className='Product-discount-price'>Savings : <span>Rs. {Quantity * (Math.floor((price * 100)/(100 - discount)) - price)}</span></div>
              <div className='Prices-section-second-div'>
                <span className='Product-total-price'>Rs. {Quantity * (Math.floor((price * 100)/(100 - discount)))}</span>
                <span className='Product-discount'>({discount}%)</span>
                <span className='selling-price-span'>Rs. {Quantity * price}.00</span>
              </div>
              <div className="delete-product-from-cart-btn">
                  <button onClick={handleDeleteProduct}>Delete</button>
              </div>
          </div>
        </div>
    </div>
  )
}

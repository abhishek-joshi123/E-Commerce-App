import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout'
import { CategoryContext } from '../Contexts/CategoryContext'
import CategoryBox from './CategoryBox'
import ProductCard from './ProductCard'
import {prices} from './Prices.js'
import Pricebox from './Pricebox'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import { RxCross2 } from 'react-icons/rx';

export default function FilterProducts() {

  const context = useContext(CategoryContext)

  const {checked, setChecked, radio, setRadio, categories, filter} = context
  const [click, setClick] = useState(true)
  const [FilterProducts, setFilterProducts] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
      if(checked.length > 0 || radio.length > 0){
          filterProduct()
      }
  }, [checked, radio])
  
  useEffect(() => {
    if(filter)
        filterByCategorySearch()
  },[filter])
 
   
  const filterProduct = async() => {

    try {
      const response = await fetch('http://localhost:5000/api/product/filter-product', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          }, 
          body: JSON.stringify({checked:checked, radio:radio})
      })

      const json = await response.json() 
      if(json.success){
        setFilterProducts(json.products)
      }
    } catch (error) {
      console.error('Something went wrong')
    }
  }

  const filterByCategorySearch = async() => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/filter-products/${filter}`, {
            method: 'GET', 
        })

        const json = await response.json() 
        if(json?.success){
          setFilterProducts(json.products)
        }
      } catch (error) {
        console.error('Something went wrong')
      }
  }

  const handleReset = () => { 
    setChecked([])
    setRadio([])
    navigate('/')
  }

  const [state, setState] = useState({
      left: false,
  });

const toggleDrawer = (anchor, open) => (event) => {
  if (
    event &&
    event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')
  ) {
    return;
  }

  setState({ ...state, [anchor]: open });
  };

  const inputList = (anchor) => (
  <Box
    sx={{ width: '300px' }}
    role="presentation"
  >
    <List className='Address-All-filters' sx={{paddingLeft: '10px'}}>
          <div className='Delievery-Address-heading'>
            <h1>Filters</h1>
            <span onClick={toggleDrawer('left', false)}><RxCross2 style={{fontSize: '40px', cursor: 'pointer'}}/></span>
          </div>
          <h2>Filter By Categories</h2>
          <div className={`Home-Categories ${click ? "category-less": "category-more"}`}>
              {
                categories?.map((category) => {
                  return <CategoryBox key={category._id} category={category} checked={checked} setChecked={setChecked}/>
                })
              }
          </div>
            <span className='show-all-btn' onClick={() => {setClick(!click)}}>{click ? 'View More' : 'View Less'}</span>
            <h2 className='Price-filter-section'>Filter By Price</h2>
            <div className='Home-Prices'>
              {
                prices?.map((price) => {
                  return <Pricebox key={price._id} price={price} setRadio={setRadio}/>
                })
              }
            </div>
    </List>
  </Box>
  );

  return (
    <Layout title = 'Best Offers - Shop Now Unlimited Items Garb fast'>
      <div className="home-Div">
        <div className='Categories-Collapse-div'>
            <button className="Filter-btn-small-screen" onClick={toggleDrawer('left', true)} >Filters</button>
            <span className='reset-all-btn2' onClick={handleReset}>Reset All</span>
        </div>
            <SwipeableDrawer
                anchor="left"
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
              >
              {inputList('left')}
          </SwipeableDrawer>
          <div className="Home-left">
          <span className='reset-all-btn' onClick={handleReset}>Reset All</span>
            <h1>Filter By Categories</h1>
            <div className={`Home-Categories ${click ? "category-less": "category-more"}`}>
                { 
                  categories?.map((category) => {
                    return <CategoryBox key={category._id} category={category} checked={checked} setChecked={setChecked}/>
                  })
                }
            </div>
              <span className='show-all-btn' onClick={() => {setClick(!click)}}>{click ? 'View More' : 'View Less'}</span>
              <h1>Filter By Price</h1>
              <div className='Home-Prices'>
                {
                  prices?.map((price) => {
                    return <Pricebox key={price._id} price={price} setRadio={setRadio}/>
                  })
                }
              </div>
          </div>
          <div className="Home-right">
            <div className='Home-Products'>
                    {
                      FilterProducts?.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                      })
                    }
            </div>
          </div>
      </div>
    </Layout>
  )
}

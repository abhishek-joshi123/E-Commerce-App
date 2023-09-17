import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout'
import '../../Styles/Home.css'
import { CategoryContext } from '../Contexts/CategoryContext'
import CategoryBox from './CategoryBox'
import ProductCard from './ProductCard'
import {prices} from './Prices.js'
import Pricebox from './Pricebox'
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinLoader from '../SpinLoader'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import { RxCross2 } from 'react-icons/rx';

export default function Home() {

  const [click, setClick] = useState(true)
  const context = useContext(CategoryContext)
  const {categories, GetAllCategories, Products, GetAllProducts, total, getTotal, FetchMoreProducts, loading, checked, setChecked, radio, setRadio} = context
  const navigate = useNavigate()
  

  useEffect(() => {
      GetAllCategories()
      getTotal()
      // eslint-disable-next-line 
  },[])

  useEffect(() => {
      if(checked.length > 0 || radio.length > 0){
        navigate('/filter-product')
      }
      else{
          GetAllProducts()
      }
  }, [checked, radio])

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
            <div className='Home-Filter-heading'>
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
    <Layout title = {'Best Offers - Shop Now Unlimited Items Garb fast'}>
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
          <InfiniteScroll
            dataLength={Products.length}
            next={FetchMoreProducts}
            hasMore={Products.length !== total}
            loader={loading && <SpinLoader/>}
          > 
            <div className='Home-Products'>
                    {
                      Products?.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                      })
                    }
            </div>
            </InfiniteScroll>
          </div>
      </div>
    </Layout>
  )
}

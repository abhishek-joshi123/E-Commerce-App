
import React, { useContext, useState} from 'react'
import Layout from '../Layouts/Layout'
import { CategoryContext } from './Contexts/CategoryContext'
import ProductCard from './Home/ProductCard'
import '../Styles/Search.css' 
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinLoader from './SpinLoader'

export default function Search() {

  const host = process.env.REACT_APP_LOCAL_HOST
   const [page, setPage] = useState(1)
   const navigate = useNavigate()
    const context = useContext(CategoryContext)
    const {Products, setProducts, search, loading, setLoading, Totalsearch} = context

    const fetchMoreSearch = async(e) => {

      try {
          setLoading(true)
          const response = await fetch(`${host}/api/product/search-product/${page+1}/${search}`, {
              method: 'GET',
              headers: {
                  'content-type': 'application/json',
              }, 
          })

          const json = await response.json()
          if(json?.success){
              setProducts(Products.concat(json.products))
          }
          setPage(page+1)
          setLoading(false)
        } catch (error) {
            navigate('/')
            setLoading(false)
      }
  }

  return (
    <Layout>
        <div className="Search-div">
            <h1>{search} related products</h1>
            <InfiniteScroll
              dataLength={Products.length}
              next={fetchMoreSearch}
              hasMore={Products.length !== Totalsearch}
              loader={loading && <SpinLoader/>}
            > 
            <div className='Search-Products'>
                    {
                      Products?.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                      })
                    }
            </div>
            </InfiniteScroll>
            {Products.length === 0 && <div className="Products-empty">
                    <div className="show-box">
                          <p>Sorry! We couldn't find any matching items for</p>
                          <p className='search-value'><span>{search}</span></p>
                          <div className="search-alert">
                            <span>Don't give up - check the spelling, or try less specific search terms</span>
                          </div>
                    </div>
                </div>}
          </div>
    </Layout>
  )
}

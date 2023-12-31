
import { createContext, useState } from "react";
import {toast} from 'react-toastify'
import { addDays, format, isToday, isTomorrow } from 'date-fns';

const CategoryContext = createContext(); 

const CategoryState = (props) => {

  const host = process.env.REACT_APP_LOCAL_HOST

    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [categories, setCategories] = useState([])
    const [Products, setProducts] = useState([])
    const [Product, setProduct] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [Totalsearch, setTotalSearch] = useState(0)
    const [filter, setFilter] = useState('')
    const [loader, setLoader] = useState(false)
    const [Productsloader, setProductsloader] = useState(false)
    const [Filtersloader, setFiltersloader] = useState(false)
    
    const currentDate = new Date();
    const futureDate = addDays(currentDate, 5);
    let displayText;
    if (isToday(futureDate)) {
      displayText = 'Today';
    } else if (isTomorrow(futureDate)) {
      displayText = 'Tomorrow';
    } else {
      displayText = format(futureDate, 'dd MMM');
    }
    const [deliveryDate, setDeliveryDate] = useState(displayText)

    const GetAllCategories = async() => {

        try {
          setFiltersloader(true);
          const response = await fetch(`${host}/api/category/get-categories`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json', 
            }
          })
          
          const json = await response.json() 
          
          if(json?.success) {
            setCategories(json.category)
          }
          else{
            console.error(json.message)
          }
          setFiltersloader(false);
        } catch (error) {
          console.error("Something went wrong");
          setFiltersloader(false);
        }
    }
    
      const ShowAllProducts = async() => {

        try {
          setProductsloader(true)
          const response = await fetch(`${host}/api/product/all-products`, {
            method: 'GET'
          })
          
          const json = await response.json()
          
          if(json?.success) {
            setProduct(json.products)
          }
          else
          console.error(json.message)
          setProductsloader(false)
        } catch (error) {
            console.error('Something went wrong')
            setProductsloader(false)
        }
    }

    const getTotal = async() => {

      try {
        const response = await fetch(`${host}/api/product/product-count`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          }, 
      })
        const json = await response.json()
        if(json?.success)
          setTotal(json.total)
  
      } catch (error) {
        console.error('Something went wrong')
      }
    }

      const GetAllProducts = async() => {

        try {
            setLoading(true)
            setProductsloader(true)
            const response = await fetch(`${host}/api/product/product-list/${page}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json', 
                }
            })

            const json = await response.json()

            if(json?.success) {
                setProducts(json.products)
            }
            else
            console.error(json.message)
            setLoading(false)
            setProductsloader(false)
          } catch (error) {
            console.error('Something went wrong')
            setLoading(false)
            setProductsloader(false)
        }
    }

      const FetchMoreProducts = async() => {
        try {
          setLoading(true)
          const response = await fetch(`${host}/api/product/product-list/${page+1}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json', 
            }
          })
          
          const json = await response.json()
          
          if(json?.success) {
            setProducts(Products.concat(json.products))
          }
          else
            console.error(json.message)
        setPage(page+1);
        setLoading(false)
      } catch (error) {
          console.error('Something went wrong')
          setLoading(false)
        }
    }

    const getTotalSearch = async() => {

      try {
        const response = await fetch(`${host}/api/product/search-count/${search}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          }, 
      })
        const json = await response.json()
        if(json?.success)
          setTotalSearch(json.total)
  
      } catch (error) {
        console.error('Something went wrong')
      }
  }
  
    return (
        <CategoryContext.Provider value={{categories, setCategories, GetAllCategories, checked, setChecked, radio, setRadio, Products, setProducts, GetAllProducts, total, getTotal, setPage, FetchMoreProducts, loading, setLoading, Product, ShowAllProducts, search, setSearch, getTotalSearch, filter, setFilter, deliveryDate, setDeliveryDate, loader, setLoader, Filtersloader, setFiltersloader, Productsloader, setProductsloader}}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export {CategoryContext, CategoryState}
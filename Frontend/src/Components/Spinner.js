import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import SpinnerImage from '../Images/SpinnerImage.gif'
import '../Styles/Spinner.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Spinner({path = 'sign-in'}) {

  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect (() => {

    const interval = setInterval (() =>{
      setCount((prev) => prev - 1)
    }, 1000)

    count === 0 && navigate(path ,{
      state: location.pathname
    })
    return () => clearInterval(interval)
  }, [count, navigate, location, path])

  return (
    <Layout title= {'Redirecting to login page'}>
      <div className="spinner-Div">
        <img src={SpinnerImage} alt="failed" />
      </div>
    </Layout>
  )
}

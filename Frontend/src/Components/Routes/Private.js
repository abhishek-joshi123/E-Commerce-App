
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/Auth'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'

export default function PrivateRoute() {

    const host = process.env.REACT_APP_LOCAL_HOST
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(() =>{

        const autoCheck = async() => {
            const response = await fetch(`${host}/api/auth/user-auth`, {
                method: 'GET',
                headers: {
                    'auth-token':auth?.token
                }, 
            })
            const json = await response.json()
            
            if(json.ok)
                setOk(true);
            else
                setOk(false);
        }

        if(auth?.token)
                autoCheck();

    }, [auth?.token]);

  return ok ? <Outlet/> : <Spinner/>
}

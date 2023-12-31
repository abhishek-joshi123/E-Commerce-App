
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();


const AuthProvider = (props) => {

    const {children} = props

    const [auth, setAuth] = useState({
        user:null,
        token:""
    })
    
    useEffect(() => {
        
        const data = localStorage.getItem('auth')

        if(data) {
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parsedData.user,
                token:parsedData.auth_token
            })
        }
        //eslint-disable-next-line 
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//  custom hook

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}
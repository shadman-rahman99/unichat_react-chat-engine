import React, { useContext, useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../firebase'

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true) 
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    // const hist = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            setUser(user)
            setLoading(false)
            if(user) navigate('/chats')
        })
    }, [user, navigate])

    const value = {user}
    return (
        // If we have any function or object stored in the variable value
        //  we pass it to Authcontext provider. 
        <AuthContext.Provider value = {value} >
            {/* if loading is false then only we will render the children */}
            { !loading && children}
        </AuthContext.Provider>
    )
}



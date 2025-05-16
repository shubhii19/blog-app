import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
// import { APIURL } from '../../utils.js';

export const AuthContext = createContext(); 
export const AuthProvider = ({children}) => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        const fetchBlog = async()=>{
            try {
                // const response = await axios.get(`${APIURL}/api/blogs/all-blogs`)
                const response = await axios.get("http://localhost:3000/api/blogs/all-blogs",{
                    withCredentials: true
                })
                console.log("Api ",APIURL)
                console.log(response);
                setBlogs(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlog();
    },[])
  return (
    <AuthContext.Provider value={{blogs}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
import React, { createContext, useState } from 'react'
export const addprojectresponsecontext=createContext()
export const editprojectreponsecontext=createContext()
export const tokenverifycontext=createContext()



function ContextAPI({children}) {
    const [addresponse,setaddresponse]=useState({})
    const [editresponse,seteditresponse]=useState({})
    const [istoken,setistoken]=useState(sessionStorage.getItem("token"))
  return (
    <>
  
       <tokenverifycontext.Provider value={{istoken,setistoken}}>
         <editprojectreponsecontext.Provider value={{editresponse,seteditresponse}}>
          <addprojectresponsecontext.Provider value={{addresponse,setaddresponse}}>
        {children}
        </addprojectresponsecontext.Provider>
        
        </editprojectreponsecontext.Provider>

       </tokenverifycontext.Provider>

    </>
  )
}

export default ContextAPI


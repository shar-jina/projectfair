import React, { useContext, useEffect, useState } from 'react'
import Add from '../component/Add'
import { Col, Row } from 'react-bootstrap'
import Edit from '../component/Edit'
import { deleteprojectAPI, getuserprojectAPI } from '../services/Allapi'
import { addprojectresponsecontext, editprojectreponsecontext } from '../context/ContextAPI'









function View() {
  const [userproject,setuserproject]=useState([])
  console.log(userproject);
  const{addresponse}=useContext(addprojectresponsecontext)
  const{editresponse}=useContext(editprojectreponsecontext)
  
  
  useEffect(()=>{
    getuserproject()

  },[addresponse,editresponse])
  const getuserproject=async()=>{
      const token=sessionStorage.getItem("token")
      if(token){
        const reqheader={"content-type":"application/json",
          "authorization":`Bearer ${token}`
        }
          try{
        const result=await getuserprojectAPI(reqheader)
        console.log(result);
        if(result.status==200){
          setuserproject(result.data)
    
        }
        
    
      }
      catch(err){
        console.log(err);
        
    
      }
    
      }
    
  }
  const handledelete=async(id)=>{
      const token=sessionStorage.getItem("token")
            if(token){
              const reqheader={
                "content-type":"application/json",
                "authorization":`Bearer ${token}`
              }
    try{
      const result=await deleteprojectAPI(id,reqheader)
      console.log(result);
      if(result.status==200){
        getuserproject()
      }
      


    }
    catch(err){
      console.log(err);
      

    }
  }
  }

  return (
    <div>
        <div className='d-flex justify-content-between mt-5 '>
          <h1 style={{fontFamily:"Dancing Script",color:"darkblue"}}>All Projects</h1>
        <Add />
        </div>
        <div>
        { userproject?.length>0?
         userproject.map(pro=>(
          <div className='border border-3 border-success p-3 mt-5 rounded d-flex justify-content-between' >
           
            <div>
              <h3 style={{fontFamily:"Dancing Script",color:"darkblue"}}>{pro.title}</h3>


            </div>
            <div className='d-flex mt-2'>
                <Edit project={pro}/>
                <button className='btn'><i className="fa-brands fa-github ms-2"></i></button>
                <button onClick={()=>handledelete(pro._id)} className='ms-2 btn'><i className="fa-solid fa-trash ms-2"></i></button>

            </div>

          </div>
         ))
         :
          <p>no project is added</p>
          }
        </div>
    </div>
  )
}

export default View
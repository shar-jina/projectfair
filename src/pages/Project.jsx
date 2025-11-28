import React, { useEffect, useState } from 'react'
import Projectcard from '../component/Projectcard'
import { getallprojectAPI } from '../services/Allapi'






function Project() {
  const [allproject ,setallproject]=useState([])
  const [projectname,setallprojectname]=useState("")
  console.log(allproject);
  
   useEffect(() => {
          getallproject()
  
      }, [projectname])
 const getallproject=async()=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqheader={"content-type":"application/json",
      "authorization":`Bearer ${token}`
    }
      try{
    const result=await getallprojectAPI(projectname,reqheader)
    console.log(result);
    if(result.status==200){
      setallproject(result.data)

    }
    

  }
  catch(err){
    console.log(err);
    

  }

  }

 }
  return (
    <div>
      <div className='d-flex align-items-center justify-content-between p-5'>
        <h1  style={{ fontFamily: "Dancing Script", color: '#10214B' }}>All Projects</h1>
        <input onChange={(e)=>setallprojectname(e.target.value)} className='p-2 rounded' type="text" placeholder='search project here..' />
      </div>
      <div className='row'>
        {
        allproject?.length>0 ?
        allproject.map(pro=>(
          <div className='col-lg-3'>
          <div className='me-5'>
                               <Projectcard project={pro}/>

          </div>

        </div>
        ))

        
        :
        <p>No project found</p>
        }

      </div>
       


    </div>
  )
}

export default Project
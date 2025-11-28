import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../component/Profile'
import View from '../component/View'





function Dashboard() {

  const [username,setusername]=useState("")
  useEffect(()=>{
    
    if(sessionStorage.getItem("user")){
      setusername(JSON.parse(sessionStorage.getItem("user")).name)
    }
    else{
      setusername("")
    }


  },[])
 
  return (
    <div>
        <Header/>
        <Row>
            <Col lg={8} sm={12} md={8} className='py-5 ps-5'>
            <h1 className='mt-5 ' style={{fontFamily:"Dancing Script",color:"darkblue"}}>Welcome <span style={{color:"orange"}}>{username}</span></h1>
                <View/>

            </Col>
            <Col lg={4} sm={12} md={4} className='py-5 ps-5 mt-5'>
                <Profile/>
            </Col>
        </Row>

    
        
    </div>
  )
}

export default Dashboard
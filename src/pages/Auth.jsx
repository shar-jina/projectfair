import React, { useContext, useState } from 'react'
import { Col, Row,  } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/Allapi';
import {toast} from 'react-toastify'
import Spinner from 'react-bootstrap/Spinner';
import { tokenverifycontext } from '../context/ContextAPI';







function Auth({insidereg}) {
    const [userdata,setuserdata]=useState({name:"",email:"",password:""})

    const navigate=useNavigate()
    const[logspinner,setlogpinner]=useState(false)
    const {setistoken}=useContext(tokenverifycontext)
    
    const handleregister=async()=>{
        const{name,email,password}=userdata
        if(name && email && password){
              try{

            const result= await registerAPI(userdata)
            if(result.status==200){
                toast.success(`welcome ${result.data.name}... please login to explore our site`)
                navigate('/login')
                setuserdata({name:"",email:"",password:""})
            }
            else{
                if(result.status==406){
                    toast.error(result.response.data)
                    setuserdata({name:"",email:"",password:""})


                }
            }
            
        }
        catch(err){
            console.log(err);
            
        }

        }
        else{
            toast.warning("fill the form completely")

        }
      
    }
    const handlelogin=async()=>{
        if(userdata.email && userdata.password){
            try{
                const result=await loginAPI(userdata)
                console.log(result);
                
                if(result.status==200){
                    sessionStorage.setItem("user",JSON.stringify(result.data.user))
                    sessionStorage.setItem("token",result.data.token)
                    setlogpinner(true)
                    setTimeout(() => {
                        setuserdata({name:"",email:"",password:""})
                        navigate('/')
                        setlogpinner(false)

                        
                    }, 3000);
                    setistoken(true)
                }
                else{
                    if(result.status==404){
                        toast.warning(result.response.data)
                        setuserdata({name:"",email:"",password:""})


                    }
                }
                

            }
            catch(err){
                console.log(err);
                

            }

        }
        else{
            toast.warning("enter the email and password")
        }

    }
  return (
    <div style={{minHeight:"100vh"}} >
        <div  className='m-5 border p-5 shadow rounded' style={{backgroundColor:'#B9915F'}} >
            <Row>
                <Col lg={6} md={6} sm={12}>
                <img  src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-svg-download-png-8333958.png" alt="" />
                </Col>
                <Col>
                    <h1 style={{fontFamily:"Dancing Script", color:'#192350'}} ><i className="fa-brands fa-docker"></i>Project Fair</h1>
                    <p style={{color:"orange"}}>Sign {insidereg ? 'up':'in'} your account</p>
                    <div>
                        <div className='mt-2 p-4'>
                            {
                               insidereg &&
                                <div className='mt-2'>
                                <input value={userdata.name} onChange={(e)=>setuserdata({...userdata,name:e.target.value})} className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Username' />
                                </div>
                            }
                            <div className='mt-2'>
                                <input value={userdata.email} onChange={(e)=>setuserdata({...userdata,email:e.target.value})} className='p-2 w-100 rounded border border-none'  type="email" name="" id="" placeholder='Email Adress' />
                            </div>
                            <div className='mt-2'>
                                <input value={userdata.password} onChange={(e)=>setuserdata({...userdata,password:e.target.value})} className='p-2 w-100 rounded border border-none'  type="password" name="" id="" placeholder='Password' />
                            </div>
                            {
                                insidereg?
                                <div className='mt-2'>
                                <button onClick={handleregister} className='btn  p-2 w-100 rounded border border-none'>Sign Up</button>

                            </div>:
                            <div className='mt-2 '>
                                <button onClick={handlelogin} className='btn  p-2 w-100 rounded border border-none'>Sign In
                                    { logspinner &&<Spinner animation="border" variant="info" />}
                                </button>

                            </div>
                            }
                            {
                                insidereg?
                                    <p className='mt-3'>Already have an account?<Link to={'/login'}> Login</Link></p>
                                    :
                                    <p className='mt-3'>Already have an account?<Link to={'/register'}>Register</Link></p>


                            }
                        </div>
                    </div>

                </Col>
            </Row>

        </div>
        
    </div>
  )
}

export default Auth
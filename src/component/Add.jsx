import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify'
import { addprojectAPI } from '../services/Allapi';
import { addprojectresponsecontext } from '../context/ContextAPI';







function Add() {
  const [prjctdetail,setprjctdetail]=useState({title:"",language:"",github:"",website:"",overview:"",prjctimg:""})
  console.log(prjctdetail);
  const[imgstatus,setimgstatus]=useState(false)
  const [preview,setpreview]=useState("https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-Free-PNG.png")
  const{setaddresponse}=useContext(addprojectresponsecontext)
  useEffect(()=>{
    if(prjctdetail.prjctimg.type=="image/png" || prjctdetail.prjctimg.type=="image/jpg"|| prjctdetail.prjctimg.type=="image/jpeg")
    {
      setimgstatus(true)
      setpreview(URL.createObjectURL(prjctdetail.prjctimg))
    }
    else{
      setpreview("https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-Free-PNG.png")
      setimgstatus(false)
      setprjctdetail({...prjctdetail,prjctimg:""})

    }

  },[prjctdetail.prjctimg])
  
  const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setprjctdetail({title:"",language:"",github:"",website:"",overview:"",prjctimg:""})
    setShow(false);}
  const handleShow = () => setShow(true);
  const handleupload=async()=>{
    const{title,language,github,website,overview,prjctimg}=prjctdetail
    if(title && language && github && website && overview && prjctimg){
      //apicall

      //reqbody
      const reqbody=new FormData()
        reqbody.append("title",title)
        reqbody.append("language",language)
        reqbody.append("github",github)
        reqbody.append("website",website)
        reqbody.append("overview",overview)
        reqbody.append("prjctimg",prjctimg)
      
      //reqheader
      const token=sessionStorage.getItem("token")
      if(token){
        const reqheader={
          "content-type":"multiple/form-data",
          "authorization":`Bearer ${token}`
        }
        try{
          const result=await addprojectAPI(reqbody,reqheader)
          console.log(result);
          if(result.status==200){
            toast.success("project added succesfully")
            setaddresponse(result)
            handleClose()
          }
          else{
            if(result.status==406){
              toast.error(result.response.data)
            }
          }
          


        }
        catch(err){
          console.log(err);
          

        }
      }
    }
    else{
      toast.warning("please enter the field completely ")

    }
  }
  return (

    <div>
      <button onClick={handleShow} style={{ color: '#10214B', backgroundColor: '#d7bd88' }} className='btn rounded border border-none p-2'>+ New Project</button>

      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title  style={{ fontFamily: "Dancing Script", color:  '#10214B'}}>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={3} sm={12} md={6}>
            <label>
              <img src={preview} alt="" className='img-fluid' />
              <input onChange={(e)=>setprjctdetail({...prjctdetail,prjctimg:e.target.files[0]})}  type="file"  style={{display:'none'}}/>

            </label>
              <div className='mt-5' style={{color:'orange'}}>
{   !imgstatus       &&      <p>*Upload image <br /> (jpg/jpeg/png) files <br /> Only</p>
}
              </div>
            </Col>
            <Col className='p-3'>
              <div className='mt-2'>
                <input onChange={(e)=>setprjctdetail({...prjctdetail,title:e.target.value})} className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Project Title' />
              </div>
              <div className='mt-2'>
                <input onChange={(e)=>setprjctdetail({...prjctdetail,language:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Language Used' />
              </div>
              <div className='mt-2'>
                <input onChange={(e)=>setprjctdetail({...prjctdetail,github:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Github Link' />
              </div>
              <div className='mt-2'>
                <input onChange={(e)=>setprjctdetail({...prjctdetail,website:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Website Link' />
              </div>

            </Col>
          </Row>

          <div className='mt-2'>
            <input onChange={(e)=>setprjctdetail({...prjctdetail,overview:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Project Overview' />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleupload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Add
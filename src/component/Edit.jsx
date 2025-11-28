import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../services/serverurl';
import { toast } from 'react-toastify';
import { updateprojectAPI } from '../services/Allapi';
import { editprojectreponsecontext } from '../context/ContextAPI';






function Edit({project}) {
  const [prjctdetail,setprjctdetail]=useState({title:project?.title,language:project?.language,github:project.github,website:project.website,overview:project.overview,prjctimg:""})
  console.log(prjctdetail);
    const{seteditresponse}=useContext(editprojectreponsecontext)
  
    const [preview,setpreview]=useState("")
      const[imgstatus,setimgstatus]=useState(false)
    
  
  const [show, setShow] = useState(false);
  
    const handleClose = () => {
      setShow(false)
      setprjctdetail({title:project?.title,language:project?.language,github:project.github,website:project.website,overview:project.overview,prjctimg:""})
      setpreview("")
    };
    const handleShow = () => {
       setprjctdetail({title:project?.title,language:project?.language,github:project.github,website:project.website,overview:project.overview,prjctimg:""})

      setShow(true)};
    useEffect(()=>{
        if(prjctdetail.prjctimg.type=="image/png" || prjctdetail.prjctimg.type=="image/jpg"|| prjctdetail.prjctimg.type=="image/jpeg")
        {
          setimgstatus(true)
          setpreview(URL.createObjectURL(prjctdetail.prjctimg))
        }
        else{
          setpreview("")
          setimgstatus(false)
          setprjctdetail({...prjctdetail,prjctimg:""})
    
        }
    
      },[prjctdetail.prjctimg])
      const handleupdate=async()=>{
          const{title,language,github,website,overview,prjctimg}=prjctdetail
          if(title && language && github && website && overview ){
            //apicall
      
            //reqbody
            const reqbody=new FormData()
              reqbody.append("title",title)
              reqbody.append("language",language)
              reqbody.append("github",github)
              reqbody.append("website",website)
              reqbody.append("overview",overview)
              reqbody.append("prjctimg",preview?prjctimg:project.projectimg)
            
            //reqheader
            const token=sessionStorage.getItem("token")
            if(token){
              const reqheader={
                "content-type":preview?"multipart/form-data":"application/json",
                "authorization":`Bearer ${token}`
              }
              try{
                const result=await updateprojectAPI(project?._id,reqbody,reqheader)
                console.log(result);
                if(result.status==200){
                  handleClose()
                  seteditresponse(result)
                }
                

              }
              catch(err){

              }
          
            }
          }
          else{
            toast.warning("please enter the field completely ")
      
          }
        }
  return (
    <div >
      <button onClick={handleShow} className=' btn' style={{color:'green'}} ><i class="fa-solid fa-pen-to-square"></i></button>
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
              <img src={preview?preview:`${SERVER_URL}/uploads/${project?.projectimg}`} alt="" className='img-fluid' />
              <input onChange={(e)=>setprjctdetail({...prjctdetail,prjctimg:e.target.files[0]})}  type="file"  style={{display:'none'}}/>

            </label>
              <div className='mt-5' style={{color:'orange'}}>
{   !imgstatus       &&      <p>*Upload image <br /> (jpg/jpeg/png) files <br /> Only</p>
}
              </div>
            </Col>
            <Col className='p-3'>
              <div className='mt-2'>
                <input value={prjctdetail?.title} onChange={(e)=>setprjctdetail({...prjctdetail,title:e.target.value})} className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Project Title' />
              </div>
              <div className='mt-2'>
                <input value={prjctdetail?.language}  onChange={(e)=>setprjctdetail({...prjctdetail,language:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Language Used' />
              </div>
              <div className='mt-2'>
                <input value={prjctdetail?.github}  onChange={(e)=>setprjctdetail({...prjctdetail,github:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Github Link' />
              </div>
              <div className='mt-2'>
                <input value={prjctdetail?.website}  onChange={(e)=>setprjctdetail({...prjctdetail,website:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Website Link' />
              </div>

            </Col>
          </Row>

          <div className='mt-2'>
            <input value={prjctdetail?.overview}  onChange={(e)=>setprjctdetail({...prjctdetail,overview:e.target.value})}  className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Project Overview' />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleupdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Edit
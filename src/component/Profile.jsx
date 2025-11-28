import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import SERVER_URL from '../services/serverurl';
import { toast } from 'react-toastify';
import { updateprofileAPI } from '../services/Allapi';



function Profile() {
  const [userdetails, setuserdetails] = useState({ name: "", email: "", password: "", github: "", linkedin: "", profile: "" })
  console.log(userdetails);
  const [existingimg, setexistingimg] = useState("")
  const [preview, setpreview] = useState("")

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const existinguser = JSON.parse(sessionStorage.getItem("user"))
      setuserdetails({ ...userdetails, name: existinguser?.name, email: existinguser?.email, password: existinguser?.password, github: existinguser?.github, linkedin: existinguser?.linkedin })
      setexistingimg(existinguser.profile)
    }


  }, [open])
  useEffect(() => {
    if (userdetails.profile) {
      setpreview(URL.createObjectURL(userdetails.profile))

    }
  }, [userdetails.profile])
  const handleupadate = async () => {
    const { name, email, password, github, linkedin, profile } = userdetails
    if (name && email && password && github && linkedin) {
      const reqbody = new FormData()
      reqbody.append("name", name)
      reqbody.append("email", email)
      reqbody.append("password", password)
      reqbody.append("github", github)
      reqbody.append("linkedin", linkedin)
      preview ? reqbody.append("profile", profile) : reqbody.append("profile", existingimg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqheader = {
          "content-type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        }
        try {
          const result = await updateprofileAPI( reqbody,reqheader)
          console.log(result);
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("user",JSON.stringify(result.data))
          }


        }
        catch (err) {
          console.log(err);


        }
      }


    }
    else {
      toast.warning("fill the form completely")

    }

  }




  return (
    <div>
      <div className='d-flex justify-content-between p-4 mt-5'>
        <h2 style={{ fontFamily: "Dancing Script", color: '#10214B' }}> Profile</h2>
        <div>
          <Button
            variant='info'
            onClick={() => setOpen(!open)}
            // aria-controls="example-collapse-text"
            aria-expanded={open}


          >
            <i className="fa-solid fa-angle-down"></i>
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text " className='border shadow p-2 text-center rounded mt-2'>
              <label >
                {
                  existingimg == "" ?
                    <img height={'100px'} src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRQjixif_TuvXN5fjH0Yt6YJwot3SA6zTbQ&s"} alt="" style={{ height: '150px', borderRadius: '50%' }} />


                    :
                    <img height={'100px'} src={preview ? preview : `${SERVER_URL}/uploads/${existingimg}`} alt="" />
                }
                <input type="file" style={{ display: 'none' }} onChange={(e) => setuserdetails({ ...userdetails, profile: e.target.files[0] })} />
              </label>

              <div className='mt-2'>
                <input onChange={(e) => setuserdetails({ ...userdetails, github: e.target.value })} value={userdetails?.github} className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Github Link' />
              </div>
              <div className='mt-2'>
                <input onChange={(e) => setuserdetails({ ...userdetails, linkedin: e.target.value })} value={userdetails?.linkedin} className='p-2 w-100 rounded border border-none' type="text" name="" id="" placeholder='Linkdin Link' />
              </div>
              <div className='mt-2 '>
                <button onClick={handleupadate} style={{ backgroundColor: 'red' }} className='btn  p-2 w-100 rounded border border-none'>update Profile</button>

              </div>

            </div>
          </Collapse>
        </div>



      </div>
    </div>
  )
}

export default Profile
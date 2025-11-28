import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { tokenverifycontext } from '../context/ContextAPI';



function Header() {
    const navigate=useNavigate()
        const {setistoken}=useContext(tokenverifycontext)
    
  
  const handlelogout=()=>{
    sessionStorage.clear()
    navigate('/login')
    setistoken(false)


  }
  return (
    <div  >
       <Navbar  style={{background:'#B9915F'}}>
      <Container  >
        <Navbar.Brand href="#home">
            <h1 style={{fontFamily:"Dancing Script", color:'darkblue'}} ><i className="fa-brands fa-docker"></i>Project Fair</h1>

        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <button onClick={handlelogout} className='p-2 rounded border border-none' style={{backgroundColor:'orange'}}>Logout</button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default Header
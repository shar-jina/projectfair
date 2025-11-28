import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
        <div className='py-5'>
      <div className='row m-5'>
        <div className="col-lg-6 px-5">
          <h1 style={{ fontFamily: "Dancing Script", color: '#10214B' }}>
            <i className="fa-brands fa-docker"></i>
              Project Fair
          </h1>
          <p style={{ fontFamily: "Dancing Script",fontSize:'20px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, nisi non deserunt aliquid tempora debitis quae nobis alias illo cumque fugit recusandae distinctio perspiciatis quo nihil, delectus magni cum odit.</p>
        </div>
        <div className="col-lg-2">
          <h1 style={{color: '#10214B'}}>Link</h1>
          <Link className="text-decoration-none d-block text-secondary" to={'/'}>Landing</Link>
          <Link className="text-decoration-none d-block text-secondary" to={'/dashboard'}>Dashboard</Link>
          <Link className="text-decoration-none d-block text-secondary" to={'/Project'}>History</Link>


        </div>
        <div className="col-lg-2">
          <h1 style={{color: '#10214B'}}>Guides</h1>
          <div>
            <Link className="text-decoration-none d-block text-secondary" to={'/'}>React</Link>
           <Link className="text-decoration-none d-block text-secondary" to={'/'}>Recat-Bootsrap</Link>
           <Link className="text-decoration-none d-block text-secondary" to={'/'}>React-rRouter</Link>
          </div>
        

        </div>
        <div className="col-lg-2">
          <h1 style={{color: '#10214B'}}>Contact Us</h1>
          <div className='d-flex'>
            <input className='rounded' type="text" placeholder='enter email' />
           <button className='btn btn-danger ms-2'><i class="fa-solid fa-arrow-right"></i></button>
          </div>

        </div>
      </div>
      <div className='d-flex aligns-item-center justify-content-center'>
        <div className='ms-3 fs-5'>
          <i class="fa-brands fa-github"></i>
        </div>
        <div className='ms-3 fs-5' >
            <i class="fa-brands fa-instagram"></i>
        </div>
        <div className='ms-3 fs-5'>
          <i class="fa-brands fa-twitter"></i>
        </div>
        <div className='ms-3 fs-5'>
          <i class="fa-brands fa-facebook"></i>
        </div>
        <div className='ms-3 fs-5'>
          <i class="fa-solid fa-phone"></i>
        </div>
      </div>
    </div>
  )
}

export default Footer
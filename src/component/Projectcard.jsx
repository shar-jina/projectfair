import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import SERVER_URL from '../services/serverurl';




function Projectcard({project}) {
      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <div>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img onClick={handleShow} variant="top" src={`${SERVER_URL}/uploads/${project.projectimg}`} className='p-2' />
                        <Card.Body>
                            <Card.Title>{project?.title}</Card.Title>
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={3} sm={12} md={6}>
                            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/project_management_coursefees.jpg" alt=""  className='img-fluid'/>
                            <div className='mt-5'>
                                <Link to={project?.github}><button className='btn w-100  ' style={{backgroundColor:'#213a56'}}><i class="fa-brands fa-github"></i></button></Link>
                                <Link to={project?.website}><button className='btn w-100 mt-2' style={{backgroundColor:"#997953"}}><i class="fa-solid fa-link"></i></button></Link>

                            </div>
                        </Col>
                        <Col className='p-3'>
                        <div>
                            <h1 style={{fontFamily:"Dancing Script",color:'#10214B'}}>Job Portal :{project?.title} </h1>
                            <h2 style={{fontFamily:"Dancing Script",color:'#d7bd88'}}>Languages : <span className='text-dark'>{project?.language}</span></h2>
                            <h2 style={{fontFamily:"Dancing Script",color:'#d7bd88'}}>overView : <span className='text-dark fs-5'>{project?.overview}</span></h2>
                        </div>
                        </Col>
                    </Row>
                </Modal.Body>
          
            </Modal>

        </div>
    )
}

export default Projectcard
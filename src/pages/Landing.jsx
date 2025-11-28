import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Projectcard from '../component/Projectcard'
import Card from 'react-bootstrap/Card';
import { gethomeprojectAPI } from '../services/Allapi';
import {toast} from 'react-toastify'







function Landing() {
    const [homeproject, sethomeproject] = useState([])
    console.log(homeproject);
    const navigate=useNavigate()
    
    useEffect(() => {
        gethomeproject()

    }, [])
    const gethomeproject = async () => {
        try {
            const result = await gethomeprojectAPI()
            console.log(result);
            
            sethomeproject(result.data)
           
            
        }
        catch (err) {
            console.log(err);


        }
    }
    const handleproject=()=>{
        if(sessionStorage.getItem("token")){
            navigate('/project')

        }
        else{
            toast.warning("please login")

        }
    }


    return (
        <div>
            <Row className='py-5 ps-5 mt-5 '>
                <Col sm={12} md={6} lg={6} className='py-5 mt-5 ps-5'>
                    <h1 style={{ fontFamily: "Dancing Script", color: '#10214B' }} ><i className="fa-brands fa-docker"></i>Project Fair</h1>
                    <p className='mt-5' style={{ fontFamily: "Dancing Script", fontSize: '20px' }}>On top destination for all software development projects where user can <br /> add and manage thire projects .As well as acess all projects available in our <br /> website...what are you waiting for!!!</p>
                    {
                        sessionStorage.getItem("token") ?
                            <Link to={'/dashboard'}><button className='p-3 rounded border border-none mt-3' style={{ backgroundColor: '#d7bd88', color: "white" }}>Manage your Project</button></Link>
                            :
                            <Link to={'/login'}><button className='p-3 rounded border border-none mt-3' style={{ backgroundColor: '#d7bd88', color: "white" }}>Start to explore</button></Link>


                    }                </Col>
                <Col sm={12} md={6} lg={6}>
                    <img className='py-5 ps-5' src="https://jjws.in/wp-content/uploads/2024/12/hackaton.png" alt="" />
                </Col>
            </Row>

            <div className='mt-5 text-center p-5 '>
                <h1 className='mt-5' style={{ fontFamily: "Dancing Script", color: '#10214B' }}>Explore our Project</h1>
                <marquee behavior="" direction="">
                  <div className='d-flex'>
                      { homeproject?.length>0 &&
                    homeproject?.map(pro=>(
                         <div className='mt-5 p-5 '>
                        <Projectcard project={pro} />
                    </div>
                    ))
                       }
                  </div>
                </marquee>
                <button onClick={handleproject} className='btn btn-link mt-5'>Click here to view more Project</button>

            </div>
            <div className='mt-5 p-5'>
                <h1 className='text-center mt-5' style={{ fontFamily: "Dancing Script", color: '#10214B' }}>Our Tesstimonials</h1>
                <Row className='mt-5 p-5'>
                    <Col lg={4} sm={12} md={4} className='mt-2 '>
                        <Card style={{ width: '18rem', height: '24rem' }}>
                            <Card.Img variant="top" src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Clipart-Background.png" style={{ height: "12rem" }} />
                            <Card.Body>
                                <Card.Title className='text-center' style={{ color: '#10214B' }}>Henry Celler</Card.Title>
                                <Card.Text style={{ fontFamily: "Dancing Script" }} className='text-center'>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} sm={12} md={4} className='mt-2'>
                        <Card style={{ width: '18rem', height: '24rem' }}>
                            <Card.Img variant="top" src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png" style={{ height: "12rem" }} />
                            <Card.Body>
                                <Card.Title className='text-center' style={{ color: '#10214B' }}>Max Miller</Card.Title>
                                <Card.Text style={{ fontFamily: "Dancing Script" }} className='text-center'>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} sm={12} md={4} className='mt-2'>
                        <Card style={{ width: '18rem', height: '24rem' }}>
                            <Card.Img variant="top" src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-No-Background.png" style={{ height: "12rem" }} />
                            <Card.Body>
                                <Card.Title className='text-center' style={{ color: '#10214B' }}>John Kery</Card.Title>
                                <Card.Text style={{ fontFamily: "Dancing Script" }} className='text-center'>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </div>

        </div>
    )
}

export default Landing
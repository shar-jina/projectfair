import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Project from './pages/Project'
import Pnf from './component/Pnf'
import Footer from './component/Footer'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { tokenverifycontext } from './context/ContextAPI'







function App() {
  const{istoken}=useContext(tokenverifycontext)

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}

theme="light"
/>

    <Routes>
      <Route path={'/'} element={<Landing/>}/>
      <Route path={'/dashboard'} element={istoken?<Dashboard/>:<Navigate to={'/login'}/>}/>
      <Route path={'/project'} element={istoken?<Project/>:<Navigate to={'/login'}/>}/>
      <Route path={'/login'} element={<Auth/>}/>
      <Route path={'/register'} element={<Auth insidereg={true}/>}/>
      <Route path={'/*'} element={<Pnf/>}/>





    </Routes>
    <Footer/>
     
    </>
  )
}

export default App

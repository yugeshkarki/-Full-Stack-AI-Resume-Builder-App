import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import DashBoard from './pages/DashBoard.jsx'
import ResumeBuilder from'./pages/ResumeBuilder.jsx'
import Preview from './pages/Preview.jsx'
import Login from './pages/Login.jsx'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="app" element={<Layout/>}>
        <Route index element={<DashBoard/>}/>
        <Route path="builder/:resumeId" element={<ResumeBuilder/>}/>

        </Route>
        <Route path='view/:resumeId' element={<Preview/>}/>
        <Route path='login' element={<Login/>}/>
              </Routes>
    </>
  )
}

export default App

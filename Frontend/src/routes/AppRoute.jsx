
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../page/Homepage'
import { AboutPage } from '../page/AboutPage'
import { ContactPage } from '../page/ContactPage'
import Register from '../page/Register'
import Login from '../page/Login'
import Project from '../component/project'
import UserAuth from '../auth/User.Auth'

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuth><Homepage /></UserAuth>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project" element={<Project/>} />
        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
  )
}

export default AppRoute
//import React from 'react'
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Homepage from "./page/Homepage";
import { AboutPage } from "./page/AboutPage";
import { ContactPage } from "./page/ContactPage";
import Register from "./page/Register";
import Login from "./page/Login";

const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
  )
}

export default App
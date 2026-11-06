import React from 'react';
import Home from './home/Home';
import Navbar from './component/Navbar';
import Footer from './component/footer';
import { Route, Routes } from "react-router-dom";
import Courses from './courses/Courses';
import Signup from './component/Signup';
import Login from './component/Login';
import Contact from './component/Contact';
import About from './component/About';
import BookDetails from './component/BookDetails';
import Admin from '../Admin/Admin';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
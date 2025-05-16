import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthProvider";

const App = () => {
  const location = useLocation();
  const hideNavFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  const {blogs} = useAuth();
  console.log(blogs)

  // const { blogs } = useAuth();

  // useEffect(() => {
  //   console.log("Blogs data: ", blogs);
  // }, [blogs]);

  return (
    <div className="">
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default App;

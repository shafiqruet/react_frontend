import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Events from "./pages/events";
import AnnualReport from "./pages/annual";
import Teams from "./pages/team";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import Product from "./pages/product";
import ProductList from "./pages/product_list";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product_list" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/annual" element={<AnnualReport />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

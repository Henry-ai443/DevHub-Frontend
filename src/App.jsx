import React from "react"
import './styles/themes/darktheme.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//PAGES IMPORTS
import Signup from "./pages/signup";
import Login from "./pages/login";
import LandingPage from "./pages/Landing";
import ProfileForm from "./components/ProfileForm";


function App() {

    return(
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element ={<ProfileForm/>}/>
                <Route path="/" element={<LandingPage/>}></Route>
            </Routes>
        </Router>
    )

}

export default App

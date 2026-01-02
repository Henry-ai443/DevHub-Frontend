import React from "react"
import './styles/themes/darktheme.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//PAGES IMPORTS
import Signup from "./pages/signup";
import Login from "./pages/login";


function App() {

    return(
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )

}

export default App

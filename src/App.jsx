import React from "react"
import './styles/themes/darktheme.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/Landing";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./components/ProfileForm";
import BrowseDevelopers from "./pages/BrowseDevelopers";

function App() {
  return(
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><ProfileForm/></ProtectedRoute>}/>
          <Route path="/setup-profile" element={<ProtectedRoute><ProfileForm/></ProtectedRoute>}/>
          
          {/* Developer Routes */}
          <Route path="/developer/projects" element={<ProtectedRoute requireRole="DEVELOPER"><Dashboard/></ProtectedRoute>}/>
          <Route path="/developer/hires" element={<ProtectedRoute requireRole="DEVELOPER"><Dashboard/></ProtectedRoute>}/>
          <Route path="/developer/tasks" element={<ProtectedRoute requireRole="DEVELOPER"><Dashboard/></ProtectedRoute>}/>
          
          {/* Client Routes */}
          <Route path="/client/projects" element={<ProtectedRoute requireRole="CLIENT"><Dashboard/></ProtectedRoute>}/>
          <Route path="/client/browse" element={<ProtectedRoute requireRole="CLIENT"><BrowseDevelopers/></ProtectedRoute>}/>
          <Route path="/client/hires" element={<ProtectedRoute requireRole="CLIENT"><Dashboard/></ProtectedRoute>}/>
          
          {/* Shared Routes */}
          <Route path="/messages" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

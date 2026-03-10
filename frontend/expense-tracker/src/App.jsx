import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home"
import Income from "./pages/dashboard/Income"
import Expense from "./pages/dashboard/Expense"
import UserProvider from './context/userContext';
import {Toaster} from 'react-hot-toast'

// Note: SignUp, Home, Income, and Expense pages must exist for this to run without errors.
// For now, we point them to the imported (but currently empty) components.

// --- Root Component (Redirect Logic) ---
const Root = () => {
  // Check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");
  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} /> 
          
          <Route path='/dashboard' element={<Home />} /> 
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>
    </div>
    <Toaster
      toastOptions={{
          className:"",
          style:{
            fontSize:'13px'
          }
      }}
    />
  </UserProvider>
  );
};

export default App
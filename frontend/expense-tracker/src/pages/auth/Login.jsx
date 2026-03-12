import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import AuthLayout from '../../components/layouts/Authlayout';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {updateUser}=useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter an valid email")
      return;
    }
    if (!password) {
      setError("Please enete a password ");
      return;
    } 
    //Login Api Call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        setError("");
        console.log("Login successful for ",email);
        updateUser(user)
        navigate("/dashboard");
      }
    } catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }else{
          setError("Something went wrong. Please Try again later");
        }
    }

  };

  return (
    <AuthLayout>
      <div className='w-full max-w-sm'>
        {/* Welcome Text Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Welcome Back</h1>
          <p className='text-sm text-gray-600 mt-1'>Please enter your details to log in.</p>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col gap-2'>

          {/* Email Input */}
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          {/* Password Input */}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {/* Error Message */}
          {error && (
            <p className='text-red-500 text-xs pb-2.5'>{error}</p>
          )}

          {/* LOGIN Button - Uses custom 'btn-primary' style */}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
        </form>

        {/* Signup Link FIX: Removed text-center from the parent div */}
        <div className='mt-3'>
          <p className='text-[13px] text-slate-800'>
            Don't have an account?
            <Link to="/signup" className='font-medium text-purple-600 underline ml-1'>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
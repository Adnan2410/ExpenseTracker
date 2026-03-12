import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import AuthLayout from '../../components/layouts/Authlayout';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {updateUser}=useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  //handle signup sumbmit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please Enter your Full Name");
      return;
    };
    if (!validateEmail(email)) {
      setError("Please Enter an valid email")
      return;
    }
    if (!password) {
      setError("Please enete a password ");
      return;
    }
   

    //Signup Api

    try{
        //image upload
      if(profilePic){
        const imageUploadRes=await uploadImage(profilePic);
        profileImageUrl=imageUploadRes.imageUrl||"";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      });
      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        setError("");
        console.log("Sign Up successful for ",email);
        updateUser(user);
        navigate("/dashboard");
      }

    }catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }else{
          setError("Something went wrong. Please Try again later");
        }
    }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering details below</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            {/* Password Input */}
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password" />
            </div>

          </div>
          {/* Error Message */}
          {error && (
            <p className='text-red-500 text-xs pb-2.5'>{error}</p>
          )}

          {/* LOGIN Button - Uses custom 'btn-primary' style */}
          <button type="submit" className="btn-primary">
            SignUp
          </button>
        </form>
        {/* Signup Link FIX: Removed text-center from the parent div */}
        <div className='mt-3'>
          <p className='text-[13px] text-slate-800'>
            Already have an account?
            <Link to="/login" className='font-medium text-purple-600 underline ml-1'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp

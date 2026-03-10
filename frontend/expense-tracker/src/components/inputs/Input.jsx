import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'; 

const Input = ({ value, onChange, placeholder, label, type }) => {
    // State to toggle the visibility of the password field content
    const [showPassword, setShowPassword] = useState(false);

    // Handler to flip the showPassword state
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {/* Label displayed above the input field */}
            <label className="text-[13px] text-gray-800">
                {label}
            </label>

            {/* Input box wrapper applies the reusable custom style defined in index.css */}
            <div className='input-box'>
                <input
                    // Conditional type switching for password visibility
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    // Input styling: takes full width, transparent background, removes browser focus outline
                    className="w-full bg-transparent outline-none" 
                />

                {/* Password Toggle Icon: Only renders if the prop type is explicitly 'password' */}
                {type === "password" && (
                    showPassword ? (
                        // Eye icon (Password visible)
                        <FaRegEye
                            size={22}
                            className="text-purple-600 cursor-pointer" 
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        // Slashed eye icon (Password hidden)
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;

import React, { useRef, useState } from 'react';
import { LuUpload, LuTrash, LuUser } from 'react-icons/lu'; 

const ProfilePhotoSelector = ({ image, setImage }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleChooseFile = () => {
        inputRef.current.click();
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = null;
        }
    };

    return (
        <div className="flex justify-center mb-8">
            <div className="flex justify-center items-center gap-6">

                {/* 1. Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                {/* 2. Image Display Area (Conditional Rendering) */}
                {image ? (
                    /* CASE 1: Image is selected (Show Photo + Delete Icon on BOTTOM-RIGHT) */
                    <div className="relative w-24 h-24 rounded-full group">
                        <img 
                            src={previewUrl} 
                            alt="profile photo"
                            className="w-full h-full rounded-full object-cover" 
                        />
                         {/* DELETE Icon: Positioned at BOTTOM-RIGHT */}
                        <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-md opacity-100 group-hover:opacity-75 transition-opacity"
                            onClick={handleRemoveImage}
                        >
                            <LuTrash size={16} />
                        </button>
                    </div>

                ) : (
                    /* CASE 2: No image selected (Show Placeholder + Upload Icon on BOTTOM-RIGHT) */
                    <div className="relative w-24 h-24 rounded-full group">
                        <div className="w-full h-full flex items-center justify-center bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200 transition-colors" onClick={handleChooseFile}>
                            {/* Main User Icon */}
                            <LuUser className="text-4xl text-purple-600 transition-colors" />
                        </div>
                         
                         {/* UPLOAD Icon: Positioned at BOTTOM-RIGHT */}
                         <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-md"
                            onClick={handleChooseFile}
                        >
                            <LuUpload size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePhotoSelector;

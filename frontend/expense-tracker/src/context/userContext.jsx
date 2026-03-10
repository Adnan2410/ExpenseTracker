import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
    //Update user's data
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    //clear user's data
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}
        >{children}</UserContext.Provider>
    );
}
export default UserProvider;
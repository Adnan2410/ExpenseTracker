const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    
    //validation chek for missing field
    if (!fullName || !email || !password || !profileImageUrl) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        //check if email alreafy exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // FIX 1: Corrected 'meassage' typo
            return res.status(400).json({ message: "Email already exists" });
        }

        // FIX 2: Corrected 'passowrd' typo
        const user = await User.create({
            fullName, email, password, profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            // FIX 3: Corrected 'User._id' (which is undefined) to 'user._id' (the new user's ID)
            token: generateToken(user._id),
        });
    } catch (e) {
        // Log the actual error to your terminal for better debugging
        console.error(e); 
        res.status(500).json({ message: "Error in registering user" }); // Corrected 'regesterirng' typo
    }
};

exports.loginUser = async (req, res) => {
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user=await User.findOne({email});
        if(!user||!(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid credntials"});
        }
        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    }catch(err){
        res.status(500).json({message:"Error while loging",error:err.message});
    }
 };
exports.getUserInfo = async (req, res) => {
    try{
        const user=await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(400).json({message:"Can't find user with this id"});
        }
        res.status(200).json(user);
    }catch(err){
        return res.status(400).json({message:"Error while getting user info",error:err.message})
    }
 };


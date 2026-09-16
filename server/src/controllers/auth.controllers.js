import { User } from "../models/User.models.js";
import  bcrypt from "bcryptjs";
import {generateAccesstoken, generateRefreshtoken} from "../utils/genrateTokens.utils.js"
import  jwt  from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    // get data
    const { name, email, password, role } = req.body;

    // check for role which user reigstered
    if(role !== "user" && role !== "organizer"){
        return res.status(400)
        .json({
            success:false,
            message:"Invalid Role"
        })
    }

    // hashed password before saving

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role,
    });

    if(!user){
        return res.status(400)
        .json({
            success:false,
            message:"User Not Registered"
        })
    }

    // get access and refresh token 

    const accessToken = generateAccesstoken(user);
    const refreshToken = generateRefreshtoken(user);

    user.refreshToken = refreshToken;
    await user.save();

  const safeUser = await User.findById(user._id).select("-password -refreshToken");
    // return res

    return res.status(201)
    .json({
        success:true,
        message:"User Registered",
        user:safeUser, 
        accessToken,
        refreshToken
    })
  } catch (error) {
    console.log(`Register user error: ${error.message}`);
    return res.status(500)
    .json({
        success:false,
        message:"Internal Server Error"
    })
  }
};


export const loginUser = async(req, res) => {
    try{
    // get data
    const {email , password} = req.body;

    // find user 
    const user = await User.findOne({email});

    if(!user){
    return res.status(400)
    .json({
        success:false,
        message:"Invalid email or password"
    })
}


    // check password 
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);

    if(!isMatch){
        return res.status(400)
        .json({
            success:false,
            message:"Invalid email or password"
        })
    }

    // get tokes
    const accessToken= generateAccesstoken(user);
    const refreshToken = generateRefreshtoken(user);

    user.refreshToken = refreshToken;
    await user.save();

    // set refresh token http only

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    })

    // return res
    return res.status(200)
    .json({
        success:true,
        message:"User logged In",
        user,
        role:user.role,
        accessToken,
    })
    
}catch(error){
    console.log(`Log in error ${error.message}`);
    return res.status(500)
    .json({
        success:false,
        message:"Internal Server Error"
    })
}
}


export const logoutUser = async(req, res) => {
    try {
        // get userid
        const {userId} = req.params;

        // find user
        const user = await User.findOne({userId});
        
        if(!user){
         return res.status(404)
        .json({
            success:false,
            message:"user not found"
        })
    }
        
        // remove refreshtoken
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })

        // return resposne
        return res.status(200)
        .json({
            success:true,
            message:"user Logged out"
        })

    } catch (error) {
        return res.status(500)
        .json({
            success:false,
            message:`Internal Server Error ${error.message}`
        })
    }
}

export const refreshAccessToken = async(req, res) =>{
    try{
    // get data
    const {refreshToken} = req.body;
    
    //validate

    const user = await User.findOne({refreshToken});

    if(!user){
        return res.status(400)
        .json({
            success:false,
            message:"Invalid refresh token"
        })
    }
    
    // verify refresh token
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET
    );

    // create nw accesstoken
    const newAccessToken = generateAccesstoken(user);

    // return res
    return res.status(200)
    .json({
        success:true,
        accessToken:newAccessToken
    })
}catch(error){
    return res.status(500)
    .json({
        success:false,
        message:`Internal Server Error ${error.message}`
    })
}

}


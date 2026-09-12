import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";
import { uploadImages } from "../utils/upload.utils.js";
import { generateRefreshtoken } from "../utils/genrateTokens.utils.js";
import { sendEmail} from "../utils/sendEmail.js"

export const getUser = async (req, res) => {
  try {
    // get id
    const { userId } = req.user.id;

    // validate

    const user = await User.findOne(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // return user;

    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server Error ${error.message}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // get id
    const userId = req.user.id;
    const { name, profileImage, interests, favoriteEvents } = req.body;

    // image
    const updateData = {
      name,
      interests,
      favoriteEvents,
    };

    let imageUrl;
    if (req.file?.path) {
      imageUrl = await uploadImages(req.file.path);
    }

    if (imageUrl) {
      updateData.profileImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");



    //validate

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //return res
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(`Update user profile error ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const deleteProfile = async(req, res) => {
    try {
        // get data
        const {userId} = req.params;
        console.log("id0", userId);
        // find user
        const user = await User.findByIdAndDelete(userId);

        // validate
        if(!user){
            return res.status(404)
            .json({
                success:false,
                message:"User not found"
            })
        }

        // return res
        return res.status(200)
        .json({
            success:true,
            message:"Profile deleted successfully",
            user
        })
    } catch (error) {
        console.log(`Delete Profile error: ${error.message}`);

        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const updatePassword = async(req, res) => {
    try {
        // get data
        const {userId} = req.params;
        const {password, newPassword} = req.body;

        const user = await User.findById(userId);

        // validate
        if(!user){
            return res.status(404)
            .json({
                success:false,
                message:"User not found"
            })
        }

        // compare passwored
        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(404)
            .json({
                success:false,
                message:"Incorrect current password"
            })
        }

        // new password

        const hashedPassword  = await bcrypt.hash(newPassword, 10);
        user.password= hashedPassword;
        await user.save();

        return res.status(200)
        .json({
            success:true,
            message:"Password updated successfully",
            user
        })
    } catch (error) {
        console.log(`Update password error: ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const requestPasswordReset = async(req, res) => {
    try {
        // get data
        const {email} = req.body;
        const user  = await User.findOne({email});

        //vaidate
        if(!user){
            return res.status(404)
            .json({
                success:false,
                message:"User not found"
            })
        }

        const resetToken = generateRefreshtoken(user);

         console.log(`Reset link: http://localhost:5000/auth/reset-password/${resetToken}`);
          const resetUrl = `http://localhost:5000/auth/reset-password/${resetToken}`;
          const message = `You requested a password reset.\n\nClick here: ${resetUrl}\n\nThis link expires in 15 minutes.`;

          await sendEmail({
            to:user.email,
            subject:"Password Reset Request",
            text: message
          })
        // validate

        return res.status(200)
        .json({
            success:true,
            message:"Reset link sent"
        })
    } catch (error) {
        console.log(`reset password request error : ${error.message}`);

        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const resetPassword = async(req , res) => {
    try {
        // get data

        const {token}  = req.params;
        const {newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404)
            .json({
                success:false,
                message:"User not found"
            })
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200)
        .json({
            success:true,
            message:"Passwor reset successfully"
        })
    } catch (error) {
        
        console.log(`Reset passwor error : ${error.message}`);

        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";
import crypto from "crypto"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;   
    console.log("credential: ", credential);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, profileImage } = payload;

    let user = await User.findOne({email});

    const randomPassword = crypto.randomBytes(16).toString('hex');
    if(!user){
      user = await User.create({
        googleId: sub,
        email,
        name:name,
        profileImage,
        role:"user",
        password:randomPassword
      })
    }

    const accessToken = jwt.sign(
      {id: sub, email},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "15m"}
    )

    const refreshToken = jwt.sign(
      {id: sub, email},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "7d"}
    )

    return res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileImage,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(`google Login error ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Google authentication failed"
    });
  }
};

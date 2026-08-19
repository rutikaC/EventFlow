import jwt from "jsonwebtoken";

export const generateAccesstoken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,

    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshtoken = (user) => {
    return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,

    {
      expiresIn: "7d",
    },
  );
};

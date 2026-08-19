import { errorHandler } from "./error.middleware";

export const auth = async (req, res, next) => {
  try {

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401)
      .json({
        success:false,
        message:"No header"
      })
    }

    const accessToken = header.split(" ")[1];

    if(!accessToken){
      return res.status(400)
      .json({
        success:false,
        message:"Invalid Token"
      })
    }
    const decoded = jwt.verify(
        accessToken, 
        process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401)
    .json({
        success:false,
        message: "Invalid access token"
    });
  }
};

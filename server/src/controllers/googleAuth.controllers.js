import {OAuth2Client} from "google-auth-library"

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

export const googleLogin = async(req ,res) => {
    try {
        const {credentail} =req.body;
        console.log(credentail)

        const ticket = await client.verifyIdToken({
            idToken: credentail,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const{
            sub,
            email,
            name,
            picture
        }= payload


    } catch (error) {
        console.log(`google Login error ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message: "Google authentication failed"
        })
    }
}
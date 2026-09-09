import nodemiler from "nodemailer"


export const sendEmail = async(req, res)=>{
    try {
        
        const transporter = nodemiler.createTransport({
            service: "gmail",
            auth:{
                user: process.env.
            }
        });

        const mailOptions = {
            from:`"EventFlow " <${process.env}`
        }
    } catch (error) {
        
    }
}
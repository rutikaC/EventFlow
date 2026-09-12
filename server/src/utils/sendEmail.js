import nodemiler from "nodemailer"


export const sendEmail = async({to, subject, text})=>{
    try {
        
        const transporter = nodemiler.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });
        transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("Server is ready to take messages");
  }
});


        const mailOptions = {
            from:`"EventFlow " <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(`Send Mail error ${error.message}`);
    }
}
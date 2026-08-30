import { generateEventDescription } from "../utils/gemini.utils.js"

export const  generateDescription = async(req , res ,next) =>{
    try {
        // get data

        const{title, category, venue, date, startTime, endTime, tags} = req.body;


        const description = await generateEventDescription({
            title, 
            category, 
            venue,
            date,
            startTime, 
             endTime,
              tags
        });
        
        // return res
        return res.status(200)
        .json({
            success: true,
            description
        })
    } catch (error) {
        console.log(`generate descripiton controller error ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Sever Error "
        })
    }
}
import { generateEventDescription } from "../utils/gemini.utils.js"
import { Event } from "../models/Event.models.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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

export const chatAgent = async(req, res) => {
    try {
        //get data

        const { message } = req.body;

        //find event
        const events = await Event.find({
            status:"Published",
        }).populate("category", "name");

        // create prompt
        const prompt =`
        You are EventFlow AI Assistant.
        
        Help users discover events.
        
        user message:
        ${message}
        
        Avalibale events:
        ${JSON.stringify(events)}
        
        Rules:
        - Answer only using available event information.
        - Do not invent events.
        - If the user asks about an event, provide its details.
        - If there is no matching event, say so clearly.
        `
        // response

        const response = await  ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt
        })

        return res.status(200)
        .json({
            success:true,
            message: response.text
        })
    } catch (error) {
        console.log(`chatAgent error : ${error.message}`);

        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
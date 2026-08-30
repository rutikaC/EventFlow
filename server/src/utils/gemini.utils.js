import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({
    // api key
    apiKey: process.env.GEMINI_API_KEY
});

export const generateEventDescription = async(eventData)=> {

// config
    const prompt =`
    Create an attractive and professional event description.
    Event Title:${eventData.title};
    Category:${eventData.category};
    Venue:${eventData.venue};
    Date:${eventData.date};
    Start Time:${eventData.startTime};
    End Time:${eventData.endTime};
    Tags:${eventData.tags};

    Write an engaging description suitable for an event website.
    Keep it around 100-150 words.
    Do not invent information that was not provided.
    `
    // return response
    const response = await ai.models.generateContent({
        model:"gemini-3.5-flash",
        contents:prompt
    })
    return response.text;
}
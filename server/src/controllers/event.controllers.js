import { Event } from "../models/Event.models.js";
import { uploadImages } from "../utils/upload.utils.js";

export const registerEvent = async (req, res) => {
  try {
    // event details
    const {
      title,
      description,
      // category,
      date,
      startTime,
      endTime,
      venue,
      price,
      capacity,
      availableSeats,
      status,
    } = req.body;
    const organizer = req.user.id;

 

    // image upload
     let imageUrl = null;
    if (req.file?.path) {
      imageUrl = await uploadImages(req.file.path); 
    } 
    console.log("imageUrl ", imageUrl);
    console.log("req.file.path:", req.file?.path);
    // seat limit

    if(availableSeats > capacity){
      return res.status(400)
      .json({
        success:false,
        message:"Seats are not available"
      })
    }
    
    // create event

    const event = await Event.create({
      title,
      description,
      organizer,
      // category,
      image:imageUrl,
      date,
      startTime,
      endTime,
      venue,
      price,
      capacity,
      availableSeats,
      status
    });

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event is not registered",
      });
    }

    // return res

    return res.status(201).json({
      success: true,
      message: "Event registered successfuly",
      event,
    });
  } catch (error) {
    console.log(`Register event error ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

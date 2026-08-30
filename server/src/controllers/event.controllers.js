import { Event } from "../models/Event.models.js";
import { uploadImages } from "../utils/upload.utils.js";
import { Category } from "../models/Category.models.js";
import { generateEventDescription } from "../utils/gemini.utils.js";
import { createDecipheriv } from "crypto";

export const registerEvent = async (req, res) => {
  try {
    // event details
    const {
      title,
      category,
      date,
      startTime,
      endTime,
      venue,
      price,
      capacity,
      availableSeats,
      tags,
      status,
    } = req.body;
    const organizer = req.user.id;

    // validate
    if (!organizer) {
      return res.status(400).json({
        success: false,
        message: "Unauthorize request",
      });
    }

    // seat limit

    if (availableSeats > capacity) {
      return res.status(400).json({
        success: false,
        message: "Seats are not available",
      });
    }

    // generate descripiton
    const description = await generateEventDescription({
      title,
      category,
      venue,
      date,
      startTime,
      endTime,
      tags,
    });
    // image upload
    let imageUrl = null;
    if (req.file?.path) {
      imageUrl = await uploadImages(req.file.path);
    }
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res
        .status(400)
        .json({ success: false, message: "Category not found" });
    }
    // create event

    const event = await Event.create({
      title,
      description,
      organizer,
      category: categoryDoc._id,
      image: imageUrl,
      date,
      startTime,
      endTime,
      venue,
      price,
      capacity,
      availableSeats,
      tags,
      status: status === "Published" ? "Published" : "Draft",
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

export const getAllEvents = async (req, res) => {
  try {
    // get event

    const events = await Event.find();

    // validate

    if (events.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No result found!!",
      });
    }

    // return res
    return res.status(200).json({
      success: true,
      message: "All Events listed",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getEventById = async (req, res) => {

  try {
    // get id
    const { eventId } = req.params;

    // find event
    const event = await Event.findById(eventId);

    // validate

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    // return res

    return res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.log(`Get event by id error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    // get by id
    const { eventId } = req.params;
    const { title, description, image, date, startTime, endTime, price, capacity, availableSeats, venue, tags } =
      req.body;

    // find existing event 
    const existingEvent = await Event.findById(eventId);

    //validate
    if(!existingEvent){
      return res.status(404)
      .json({
        success:false,
        message:"Event not found"
      })
    }

    // original image

    let imageUrl = existingEvent.image;

    // upload new image
    if(req.file?.path){
      imageUrl = await uploadImages(req.file.path);
    }

    // validate seats

    if(availableSeats > capacity){
      return res.status(400)
      .json({
        success:false,
        message:"Available seats cannot be greater than capacity"
      })
    }

    const event = await Event.findByIdAndUpdate(eventId,{
      title ,
      description:existingEvent.description || "",
      image:imageUrl,
      date,
      startTime,
      endTime, 
      price,
      capacity,
      availableSeats,
      venue,
      tags
    },
    {
      returnDocument:"after",
      runValidators: true
    });


    // return res
    return res.status(200).json({
      success: true,
      message:"Event updated successfully",
      event,
    });
  } catch (error) {
    console.log(`Update event error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    // get id
    const {eventId} = req.params;
    const organizer = req.user.id;

    // validate
    if(!eventId){
      return res.status(404)
      .json({
        success:false,
        message:"Invalid event id"
      })
    }
    // delet event only by organizer
    const event = await Event.findOneAndDelete({
      _id: eventId,
      organizer
    })

    // vlidate
    if(!event){
      return res.status(404)
      .json({
        success:false,
        message:"Event not found "
      })
    }
    // return res

    return res.status(200)
    .json({
      success:true,
      message:"Event deleted successsfully"
    })
  } catch (error) {
    console.log(`Delete event error: ${error.message}`);
    return res.status(500)
    .json({
      success:false, 
      message:"Internal Server Error"
    })
  }
}

export const getMyEvents = async(req, res) => {
  try {
    // get id

    const  organizer = req.user?.id;
    console.log("organizer :", organizer);

    if (!organizer) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }
    // find event 

    const events = await Event.find({
      organizer
    }).populate("category", "name")
    .sort({createdAt: -1});
    console.log("evetn", events);
    // validate
    if(events.length === 0){
      return res.status(404)
      .json({
        success:false,
        message:"No events created"
      })
    }

    // retrun res
    return res.status(200)
    .json({
      success:true,
      message:"Your events fetched successfully",
      events
    })
  } catch (error) {
    console.log(`Get my events error: ${error.message}`);

    return res.status(500)
    .json({
      success:false,
      message:"Internal Server Error"
    })
  }
}

export const updateEventStatus = async(req, res) => {
  try {
    // get id
    const {eventId} = req.params;
    const {status} = req.body;
    const organizer = req.user.id;

    // status
    if(!status.includes(status)){
      return res.status(400)
      .json({
        success:false,
        message:"Invalid event status"
      })
    }

    // update 
    const event = await Event.findOneAndUpdate(
      {
        _id:eventId,
        organizer
      },
      {
        status
      },
      {
        returnDocument:"after",
        runValidators:true
      }
    )
    console.log(event);

    // return res
    return res.status(200)
    .json({
      success:true,
      message:"Event status updated",
      event
    })
  } catch (error) {
     console.log(`Update status error: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
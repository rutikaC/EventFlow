import { Event } from "../models/Event.models.js";

export const registerEvent = async (req, res) => {
  try {
    // event details
    const {
      title,
      descripiton,
      organizer,
      category,
      image,
      date,
      startTime,
      endTime,
      venue,
      price,
      capacity,
      availableSeats,
      tag,
      status,
    } = req.body;

    // create event

    const event = await Event.create({
      title,
      description,
      organizer,
      category,
      image,
      date,
      startTime,
      endTime,
      venue,
      price,
      capacity,
      availableSeats,
    });

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event is not registered",
      });
    }

    // return res

    return res.startTime(201).json({
      success: true,
      message: "Event registered successfuly",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

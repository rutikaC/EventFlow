import { Booking } from "../models/Booking.models.js";
import {Event} from "../models/Event.models.js"
import { razorpayPayment } from "../utils/razorpay.utils.js";

export const bookEvent = async(req, res) => {
    try {
        // get data

        const {eventId} = req.params;
        const  userId = req.user.id;
        const {quantity,bookingStatus,paymentStatus} = req.body;

        // validate event

        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"No event found"
            })
        }

        //validate quantity
        if(event.availableSeats < quantity){
            return res.status(404)
            .json({
                success:false,
                message:"Sorry!! seats are not available"
            })
        }
        // calculate amount 
        const amount = event.price * quantity * 100;

        // razorpay id
        const order = await razorpayPayment.orders.create({
            amount,
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
        })
        // create booking

        const booking = await Booking.create({
            user:userId,
            event:eventId,
            quantity,
            amount: event.price * quantity,
            paymentStatus,
            bookingStatus,
            paymentId:order.id
        })

        // reduces seats
        event.availableSeats -= quantity;
        await event.save();

        // return res
        return res.status(201)
        .json({
            success:true,
            message:"Booking successfully",
            order,
            booking
        })
    } catch (error) { 
        console.log(`Book Event error: ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export const getMyBooking = async(req, res) => {
    try {
        // get id
        const userId = req.user?.id;

        if(!userId){
            return res.status(404)
            .json({
                success:false,
                message:"User must login to book event"
            })
        }

        // fing bookin

        const bookings = await Booking.find({user: userId})
        .populate("event", "title date price")
        .sort({createdAt: -1})

        // validate

        if(bookings.length === 0){
            return res.status(404)
            .json({
                success:false,
                message: "No booking found"
            })
        }

        // return res
        return res.status(200)
        .json({
            success:true,
            message:"All bookings",
            bookings
        })
    
    } catch (error) {
        
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getMyBookingById = async(req, res) => {

    try {
        // get id
        const {bookingId} = req.params;
        const userId = req.user.id;
        // validate
        
        const booking = await Booking.findById({_id: bookingId, user: userId})
        .populate("event", "title date price")
        .sort({createdAt: -1});

        if(!booking){
            return res.status(404)
            .json({
                success:false,
                message:"No bookings found"
            })
        }

        //find event
        const event = await Event.findById(booking.event);
        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"Event not found"
            })
        }

        // retunr res
        return res.status(200)
        .json({
            success:true,
            booking
        })
    } catch (error) {
        console.log(`Booking by id error: ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const cancelBooking = async(req , res) => {
    try {
        // get id 
        const {bookingId} = req.params;
        const userId = req.user.id;

        const booking = await Booking.findOne({_id:bookingId , user: userId});
        
        // validate
        if(!booking){
            return res.status(404)
            .json({
                success:false,
                message:'Booking not found'
            })
        }

        // find event 
        const event = await Event.findById(booking.event);

        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"Event not found"
            })
        }

        // resoter seats
        event.availableSeats += booking.quantity;
        await event.save();

        // update status
        booking.bookingStatus = "cancelled";
        booking.paymentStatus = "refunded";
        await booking.save();

        // reteurn res
        return res.status(200)
        .json({
            success:true,
            message:"Booking canceled Successfully",
            booking
        })
    } catch (error) {
        console.log(`Cancle booking error: ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const updateBookingStatus = async(req, res) => {
    try {
        // get id
        const {bookingId} =req.params;
        const organizerId = req.user.id;
        const {bookingStatus, paymentStatus} = req.body;
        
        // validate
        const booking = await Booking.findById({_id:bookingId, organizer: organizerId});

        if(!booking){
            return res.status(404)
            .json({
                success:false,
                message:"Booking not found"
            })
        }

        // update
        if(bookingStatus) booking.bookingStatus = bookingStatus;
        if(paymentStatus) booking.paymentStatus = paymentStatus;
        await booking.save();

        return res.status(200)
        .json({
            success: true,
            message:"Booking status update successfully",
            booking
        })
    } catch (error) {
        
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getEventBooking = async(req, res) => {
    try {
        // get id
        const {eventId} = req.params;
  

        // validate
        const event = await Event.findById(eventId);
        console.log("event", event)

        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"Event not found"
            })
        }

        //find booking 
        const bookings = await Booking.find({event: eventId})
        .populate("user", "name email")
        .sort({createdAt: -1});

        console.log("bookings ", bookings)

        if(bookings.length === 0){
            return res.status(404)
            .json({
                success:false,
                message:"No booking found"
            })
        }

        // return rs
        return res.status(200)
        .json({
            success:true,
            message:"Event bookings",
            event,
            bookings
        })
    } catch (error) {
        console.log(`Event booking error: ${error.message}`)
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
        
    }
}
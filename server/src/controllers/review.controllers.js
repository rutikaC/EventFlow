import { Review } from "../models/Review.models.js";
import { Event } from "../models/Event.models.js"

export const createReview = async(req , res) => {
    try {
        // get data
        const { eventId } = req.params;
        const userId = req.user.id;
        const {rating, comment} = req.body;

        // find event
        const event = await Event.findById(eventId);

        //validate

        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"Event not found"
            })
        }
    
        // create review
        const review = await Review.create({
            user:userId,
            event:eventId,
            rating,
            comment
        });

        //retrun res
        return res.status(200)
        .json({
            success:true,
            message:"Review created Successfully",
            review,
        })

    } catch (error) {
        console.log(`Create review error: ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const updateReview = async(req , res)=> {
    try {
        // get data
        const {eventId} = req.params;
        const  userId = req.user.id;
        const {rating, comment} = req.body;
    
        //find Event 
        const event = await Event.findById(eventId);
        console.log(event);

        //validate
        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"Event not found"
            })
        };

        // find review
        const review  = await Review.findOne({event:eventId, user:userId})
console.log(review);
        if(!review){
            return res.status(404)
            .json({
                success:false,
                message:"No review yet!!"
            })
        }

        if (rating) {
            review.rating = rating;
        }
        if (comment) {
            review.comment = comment;
        }
        await review.save();

        // return res
        return res.status(200)
        .json({
            success:true,
            message:"Review updated successfully",
            review
        })

        
    } catch (error) {
        console.log(`update review error: ${error.message}`);

        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const deleteReview = async(req, res) => {
    try {
        // get id
        const {eventId} = req.params;
        const userId = req.user.id;

        //find event 
        const event = await Event.findById(eventId);

        // validate
        if(!event){
            return res.status(404)
            .json({
                success:false,
                message:"Event not found"
            })
        }

        //get review
        const review = await Review.findOne({event:eventId, user:userId});

        if(!review){
            return res.status(404)
            .json({
                success:false,
                message:"No Reviews yet!!"
            })
        }

        await review.deleteOne();

        return res.status(200)
        .json({
            success:true,
            message:"Review deleted successfully"
        })
    } catch (error) {
        console.log(`Review delete error : ${error.message}`);
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
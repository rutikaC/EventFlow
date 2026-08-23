
export const authrole = async(req , res, next)=> {
    try {
        
        if(req.user.role !== "organizer"){
            return res.status(404)
            .json({
                success:false,
                message:"Only organizer can access"
            })
        }
        next();
    } catch (error) {
        return res.status(500)
        .json({
            success:false,
            message:"Intrnal Server Error"
        })
    }
}
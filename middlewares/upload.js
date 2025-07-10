const upload = async (req,res,next) =>{
    const {user} = req.body;
    if (!user.productImage) {
        res.status(400).json({
            message: "You must add an image"
        })
    }
}
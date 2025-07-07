const blogModel = require("../models/blogModel")

const addBlog = async (req, res)=>{
    const blogTobeAdded = await blogModel.create(req.body)
    try {
        if (!blogTobeAdded) {
            return res.status(400).json({
                status: "error",
                message: "blog not created"
            })
        }

        res.status(201).json({
            status: "Success",
            message: "Blog has been created",
            blogTobeAdded
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addBlog
}
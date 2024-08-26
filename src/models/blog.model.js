import { timeStamp } from "console";
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    blogItems:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogItems'
        }
    ]
    // createdBy:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users"
    // }

}, {timeStamp: true})


const Blogs = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default Blogs


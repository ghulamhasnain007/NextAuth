import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    blogList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogitems',  // Refers to the Blogs model
        }
    ] 
}, { timestamps: true });

const Blogs = mongoose.models.blogs || mongoose.model('blogs', blogSchema);
export default Blogs;



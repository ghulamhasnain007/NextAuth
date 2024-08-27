import mongoose from "mongoose";

const blogItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',  // Refers to the Blogs model
        required: true,
    }
}, { timestamps: true });

const BlogItems = mongoose.models.blogItems || mongoose.model('blogItems', blogItemSchema);
export default BlogItems;

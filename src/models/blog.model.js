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
    blogList: [  // Ensure the field name is 'blogList'
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogItems',  // Refers to the BlogItems model
        }
    ]
}, { timestamps: true });


const Blogs = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
export default Blogs;

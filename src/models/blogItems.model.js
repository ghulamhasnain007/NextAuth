// import mongoose from "mongoose";

// const blogItemSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'blogs',  // Refers to the Blogs model
//         required: true,
//     }
// }, { timestamps: true });

// const BlogItems = mongoose.models.blogItems || mongoose.model('blogItems', blogItemSchema);
// export default BlogItems;


import mongoose from "mongoose";

// Subdocument schema for each content block
const contentBlockSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'heading', 'link'],
        required: true,
    },
    content: {
        type: String,
        required: function() { return this.type === 'text' || this.type === 'heading' || this.type === 'link'; }
    },
    src: {
        type: String,
        required: function() { return this.type === 'image' || this.type === 'video'; }
    },
    level: {
        type: Number,
        required: function() { return this.type === 'heading'; }  // For heading levels (h1, h2, etc.)
    },
    href: {
        type: String,
        required: function() { return this.type === 'link'; }  // For links
    },
}, { _id: false });

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
    content: [contentBlockSchema],  // Array of content blocks
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',  // Refers to the Blogs model
        required: true,
    }
}, { timestamps: true });

const BlogItems = mongoose.models.blogItems || mongoose.model('blogItems', blogItemSchema);
export default BlogItems;

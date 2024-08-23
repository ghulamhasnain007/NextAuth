const mongoose = require('mongoose')

const blogItemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Users'
    // },
    // todoList:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'todos'
    //     }
    // ]
    // category:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'blogs'
    // }
}, { timestamps: true })

const BlogItems = mongoose.model('blogItems', blogItemSchema)

export default BlogItems
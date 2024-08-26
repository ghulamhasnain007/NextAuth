import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Blogs from '@/models/blog.model';

connectDB()

export async function PUT(request: Request, context: any) {
    try {
        // Get the blogId from the request parameters
        const { params } = context
        const { categoryId } = params;

        // Parse the request body to get the updated data
        const updatedData = await request.json();
        
        // Find the blog by ID and update it with the new data
        const updatedBlog = await Blogs.findByIdAndUpdate(categoryId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Ensure the update adheres to the schema validation
        });

        // If no blog is found, return an error response
        if (!updatedBlog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // Return a success response with the updated blog
        return NextResponse.json({ message: "Blog updated successfully", data: updatedBlog }, { status: 200 });
    } 
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}

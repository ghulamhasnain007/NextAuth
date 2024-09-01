import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import BlogItems from "@/models/blogItems.model";

connectDB();

export async function GET(request: NextRequest) {
    try {
        // Retrieve all blog items and populate the category and author fields with their details
        const blogs = await BlogItems.find({})
            .populate('category', 'title')  // Populate category with title
            .populate('author', 'username');   // Populate author with name (or other fields you need)

        return NextResponse.json({ message: "All Blogs", data: blogs }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
        return NextResponse.json({ message: "Failed to fetch blogs", error: error.message }, { status: 500 });
    }
}

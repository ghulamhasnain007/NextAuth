import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import BlogItems from "@/models/blogItems.model";

connectDB();

export async function GET(request: NextRequest) {
    try {
        // Retrieve all blog items and populate the category field with its details
        const blogs = await BlogItems.find({}).populate('category', 'title');

        return NextResponse.json({ message: "All Blogs", data: blogs }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
        return NextResponse.json({ message: "Failed to fetch blogs", error: error.message }, { status: 500 });
    }
}

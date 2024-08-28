import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Blogs from '@/models/blog.model';

connectDB()

export async function GET(request: NextRequest) {
    try {
        const blogs = await Blogs.find({}); // Assuming you want to retrieve all blogs

        return NextResponse.json({ message: "All Blogs", data: blogs }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
        return NextResponse.json({ message: "Failed to fetch blogs", error: error.message }, { status: 500 });
    }
}

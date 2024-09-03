// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/dbConfig/dbConfig";
// import BlogItems from "@/models/blogItems.model";

// connectDB();

// export async function GET(request: NextRequest) {
//     try {
//         // Retrieve all blog items and populate the category and author fields with their details
//         const blogs = await BlogItems.find({})
//             .populate('category', 'title')  // Populate category with title
//             .populate('author', 'username');   // Populate author with name (or other fields you need)

//         return NextResponse.json({ message: "All Blogs", data: blogs }, { status: 200 });
//     } catch (error: any) {
//         console.error("Error fetching blogs:", error.message);
//         return NextResponse.json({ message: "Failed to fetch blogs", error: error.message }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import BlogItems from "@/models/blogItems.model";
import { getDataFromToken } from "@/utils/getDataFromToken";
 // Adjust the import path according to your project structure

connectDB();

export async function GET(request: NextRequest) {
    try {
        // Get the logged-in user's ID from the token
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized", error: "User not logged in" }, { status: 401 });
        }

        // Retrieve all blog items by the logged-in user and populate the category and author fields
        const blogs = await BlogItems.find({ author: userId })
            .populate('category', 'title')  // Populate category with title
            .populate('author', 'username');   // Populate author with username

        return NextResponse.json({ message: "User's Blogs", data: blogs }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching user's blogs:", error.message);
        return NextResponse.json({ message: "Failed to fetch user's blogs", error: error.message }, { status: 500 });
    }
}


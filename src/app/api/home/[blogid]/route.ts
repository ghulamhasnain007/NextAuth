import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig/dbConfig';
import BlogItems from '@/models/blogItems.model';

connectDB();

export async function GET(request: NextRequest, context: any) {
    try {
        const { params } = context;
        const { readid } = params;

        // Find the blog and populate the category field
        const blog = await BlogItems.findById(readid).populate('category');
        
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // const wholeblog = {
        //     blog: blog,
        //     category: blog.category
        // };

        return NextResponse.json({ message: "Your Blogs", data: blog }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}
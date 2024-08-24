import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Blogs from '@/models/blog.model';

connectDB()

export async function DELETE(request: Request, { params }: any) {
    try {
        console.log(params);
        const { postId } = params;
        console.log(postId);
        
        const deletedBlog = await Blogs.findByIdAndDelete(postId);
        
        return NextResponse.json({ message: "Delete Blog Successfully", data: deletedBlog }, { status: 200 });
    } 
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}

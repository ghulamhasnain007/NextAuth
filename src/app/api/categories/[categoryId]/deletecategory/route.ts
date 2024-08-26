import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Blogs from '@/models/blog.model';
import BlogItems from "@/models/blogItems.model";

connectDB()

export async function DELETE(request: Request, context: any) {
    try {
        const { params } = context
        console.log(params);
        const { categoryId } = params;
        console.log(categoryId);
        
        const deletedBlog = await Blogs.findByIdAndDelete(categoryId);
        await BlogItems.deleteMany({ category: categoryId });
   
        return NextResponse.json({ message: "Delete Blog Successfully", data: deletedBlog }, { status: 200 });
    } 
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}

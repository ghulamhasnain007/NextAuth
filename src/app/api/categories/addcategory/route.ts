import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Blogs from "@/models/blog.model";

connectDB()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        console.log(reqBody);
        const { title, description} = reqBody
        const blog = await Blogs.findOne({title})
    
        if(blog){
            return NextResponse.json({message: "Blog with that title Already Exist", success: false}, {status: 400})
        }
    
        const newBlog = new Blogs({
            title: title,
            description: description,
        });
        await newBlog.save()
        console.log(newBlog);
        
        return NextResponse.json({message: "Blog Created Successfully", success: true, data: newBlog}, {status: 200})
    }
    catch(error: any){
        return NextResponse.json({message: "Something Went Wrong", success: false, data: error.message}, {status: 500})
    }
}
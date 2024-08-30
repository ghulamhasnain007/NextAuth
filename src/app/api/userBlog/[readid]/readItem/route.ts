// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/dbConfig/dbConfig';
// import BlogItems from '@/models/blogItems.model';

// connectDB()

// export async function GET(request: NextRequest, context: any){
//     // type BlogCategory = {
//     //     blog: 
//     // }
//     try{
//         const { params } = context
//         const { readid } = params
    
//         console.log(readid)
//         const blog = await BlogItems.findById(readid)
//         const categoryname = blog.category
//         console.log(categoryname)
//         const categoryblog = await BlogItems.findById(categoryname)
    
//         console.log(categoryblog);
//         const wholeblog = {
//             blog: blog,
//             category: categoryblog
//         }
        
//         return NextResponse.json({message: "Your Blogs", data: wholeblog}, {status: 200})
//     }
//     catch(error: any){
//         return NextResponse.json({message: "Something went wrong", error: error.message}, {status: 500})
//     }
// }

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


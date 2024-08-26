import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import BlogItems from '@/models/blogItems.model';
import getBlogCategoryById from '@/services/categories.services';
// import Blogs from '@/models/blog.model';

connectDB();

export async function PUT(request: NextRequest, context: any) {
    try {
        const { params } = context;
        const { categoryId, updateId } = params;

        console.log('Category ID:', categoryId);
        console.log('Blog ID:', updateId);

        const updatedData = await request.json();
        console.log(updatedData);
        
        // Validate the category ID
        const category = await getBlogCategoryById(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category Not Found" }, { status: 404 });
        }

        // Find the specific blog item by blogId
        const blog = await BlogItems.findByIdAndUpdate(updateId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Ensure the update adheres to the schema validation
        });

        if (!blog) {
            return NextResponse.json({ message: "Blog Item Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: " Item Updated Successfully", data: blog }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}
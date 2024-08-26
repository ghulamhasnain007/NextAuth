import { NextRequest, NextResponse } from 'next/server';
import getBlogCategoryById from '@/services/categories.services';
import { connectDB } from '@/dbConfig/dbConfig';

connectDB()

export async function GET(request: NextRequest, context: any) {
    try {
        const { params } = context;
        const { categoryId } = params;

        console.log('Category ID:', categoryId);

        // Validate the category ID
        const category = await getBlogCategoryById(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category Not Found" }, { status: 404 });
        }
        console.log(category);
        
        // Find the specific blog item by blogId
        // const blog = await BlogItems.findById(blogId);
        // if (!blog) {
        //     return NextResponse.json({ message: "Blog Item Not Found" }, { status: 404 });
        // }

        return NextResponse.json({ message: "Data Read Successfully", data: category }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}

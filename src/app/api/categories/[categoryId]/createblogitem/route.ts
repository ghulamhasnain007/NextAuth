import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import BlogItems from '@/models/blogItems.model';
import getBlogCategoryById from '@/services/categories.services';
import Blogs from '@/models/blog.model';

connectDB();

export async function POST(request: NextRequest, context: any) {
    try {
        const { params } = context;
        const reqBody = await request.json();
        const { title, description } = reqBody;
        const { categoryId } = params;

        const newBlogItem = new BlogItems({
            title: title,
            description: description,
            category: categoryId
        });

        const blogCategory = await getBlogCategoryById(categoryId);

        if (!blogCategory) {
            return NextResponse.json({ message: "Not Found" }, { status: 400 });
        }

        // Push the new blog item ID to the blogItems array
        await Blogs.findByIdAndUpdate(categoryId, {
            $push: {
                blogList: newBlogItem._id
            }
        });

        await newBlogItem.save();

        return NextResponse.json({ message: "Blog item added successfully", data: newBlogItem }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}

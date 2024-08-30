import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import BlogItems from '@/models/blogItems.model';
import getBlogCategoryById from '@/services/categories.services';
import Blogs from '@/models/blog.model';
import parseHtmlToContentBlocks from '@/services/content.services';

connectDB();

export async function POST(request: NextRequest, context: any) {
    try {
        const { params } = context;
        const reqBody = await request.json();
        console.log(reqBody);
        const { title, description, content } = reqBody;
        const { categoryId } = params;

        const parsedContent = parseHtmlToContentBlocks(content); // Implement this function

        if (!title || !description) {
            return NextResponse.json({ message: "Title and description are required." }, { status: 400 });
        }
        
        const newBlogItem = new BlogItems({
            title,
            description,
            content: parsedContent,
            category: categoryId,
        });

        // const blogCategory = await getBlogCategoryById(categoryId);

        // if (!blogCategory) {
        //     return NextResponse.json({ message: "Not Found" }, { status: 400 });
        // }

        // Push the new blog item ID to the blogItems array
        await Blogs.findByIdAndUpdate(categoryId, {
            $push: {
                blogList: newBlogItem._id
            }
        });

        await newBlogItem.save();

        return NextResponse.json({ message: "Blog item added successfully", data: newBlogItem }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error , error: error.message }, { status: 500 });
    }
}


// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectDB } from '@/dbConfig/dbConfig';
// import BlogItems from '@/models/blogItems.model';
// import Blogs from '@/models/blog.model';

// connectDB();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {
//             const { categoryId } = req.query;
//             const { title, description, content } = req.body;

//             const newBlogItem = new BlogItems({
//                 title,
//                 description,
//                 content,
//                 category: categoryId
//             });

//             await newBlogItem.save();

//             await Blogs.findByIdAndUpdate(categoryId, {
//                 $push: { blogList: newBlogItem._id }
//             });

//             return res.status(200).json({ message: 'Blog item added successfully', data: newBlogItem });
//         } catch (error: any) {
//             return res.status(500).json({ message: 'Something went wrong', error: error.message });
//         }
//     } else {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }

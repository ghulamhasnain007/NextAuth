// import { NextRequest, NextResponse } from 'next/server';
// import Blogs from '@/models/blog.model';
// import { connectDB } from '@/dbConfig/dbConfig';
// // import getBlogCategoryById from '@/services/categories.services';

// connectDB();

// export async function GET(request: NextRequest, context: any) {
//     try {
//         const { params } = context;
//         const { categoryId } = params;

//         console.log('Category ID:', categoryId);

//         // const getBlogById = await getBlogCategoryById(categoryId)

//         // if(!getBlogById){
//         //     return NextResponse.json({ message: "Category Not Found" }, { status: 404 });
//         // }

//         // Validate the category ID and populate the blogItems
//         const category = await Blogs.findById(categoryId).populate('blogItems')
//         console.log(category);
        
//         // const category = await Blogs.findById(categoryId).populate({
//         //     path: 'blogs',
//         //     select: 'blogItems'  // Adjust fields as needed
//         // });

//         if (!category) {
//             return NextResponse.json({ message: "Category Not Found" }, { status: 404 });
//         }

//         return NextResponse.json({ message: "Data Read Successfully", data: category }, { status: 200 });
//     } catch (error: any) {
//         console.log(error)
//         return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
//     }
// }
import { NextRequest, NextResponse } from 'next/server';
import Blogs from '@/models/blog.model';
import BlogItems from '@/models/blogItems.model';  // Ensure this import
import { connectDB } from '@/dbConfig/dbConfig';

connectDB();

export async function GET(request: NextRequest, context: any) {
    try {
        const { params } = context;
        const { categoryId } = params;

        console.log('Category ID:', categoryId);

        const category = await Blogs.findById(categoryId).populate(['blogList']);

        if (!category) {
            return NextResponse.json({ message: "Category Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Data Read Successfully", data: category }, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}

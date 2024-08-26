import {NextRequest, NextResponse} from 'next/server'
import { connectDB } from '@/dbConfig/dbConfig'
import BlogItems from '@/models/blogItems.model'


connectDB()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        console.log(reqBody);
        const {title, description, category}= reqBody
        const newItem = new BlogItems({
            title: title,
            description: description,
            category: category
        })
        await newItem.save()

        return NextResponse.json({message: "Blog Item created successfully", data: newItem}, {status: 200})
    }
    catch(error: any){
        return NextResponse.json({message: "Something went wrong", error: error.message}, {status: 500})
    }
}




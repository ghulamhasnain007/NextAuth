import {NextRequest, NextResponse} from 'next/server'
import { connectDB } from '@/dbConfig/dbConfig'
import BlogItems from '@/models/blogItems.model'


connectDB()

export async function POST(request: NextRequest){

}




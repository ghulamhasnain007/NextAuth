import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";  
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not Exist"}, {status: 400})
        }
        console.log(user);
        const verifyPassword = await bcryptjs.compare(password, user.password)
        if(!verifyPassword){
            return NextResponse.json({error: "Check Your Credientials"}, {status: 400})
        }
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
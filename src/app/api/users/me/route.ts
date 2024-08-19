// import { connectDB } from "@/dbConfig/dbConfig";
// import User from "@/models/userModels";  
// import { NextRequest, NextResponse } from 'next/server';

// import { getDataFromToken } from "@/utils/getDataFromToken";

// connectDB()

// export async function POST(request: NextRequest) {
//     try {
//         const userId = await getDataFromToken(request)
//         const user = await User.findOne({_id: userId}).select("_password")

//         //Check if there is no user
//         return NextResponse.json( {
//             message: "User Found",
//             data: user
//         },{status: 200})
//     }
//     catch(error: any){
//         return NextResponse.json({message: "User Not Found", error: error.message})
//     }
// }

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";  
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({
                message: "User Not Found",
                error: "No user found with the provided ID"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}

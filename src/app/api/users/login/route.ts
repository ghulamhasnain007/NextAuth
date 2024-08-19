import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";  
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB()

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
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '1d'})
        const response = NextResponse.json({
            message: "Successfully Login",
            success: true
        }, {status: 200})
        response.cookies.set('token', token, {
            httpOnly: true
        })
        
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}


// import { connectDB } from "@/dbConfig/dbConfig";
// import User from "@/models/userModels";  
// import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// connectDB()

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { email, password } = reqBody;
//         console.log(reqBody);

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
//         }
//         console.log(user);

//         // Verify the password
//         const verifyPassword = await bcryptjs.compare(password, user.password);
//         if (!verifyPassword) {
//             return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
//         }

//         // Generate a token
//         const tokenData = {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         };
        
//         const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

//         // Create the response
//         const response = NextResponse.json({
//             message: "Successfully logged in",
//             success: true
//         }, { status: 200 });

//         // Set the token as an HttpOnly cookie
//         response.cookies.set('token', token, {
//             httpOnly: true,
//             // secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
//             sameSite: 'strict',  // Prevent CSRF attacks
//             path: '/',  // Make the cookie available to all paths
//             maxAge: 60 * 60 * 24  // 1 day in seconds
//         });

//         return response;
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

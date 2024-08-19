import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";  
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); // Await added here
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        // sendEmail
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json(
            {
                message: "User successfully registered",
                success: true,
                savedUser
            }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// import { connectDB } from "@/dbConfig/dbConfig";
// import User from "@/models/userModels";  
// import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { sendEmail } from "@/utils/mailer";

// connectDB();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { username, email, password } = reqBody;
//         console.log(reqBody);

//         const user = await User.findOne({ email });

//         if (user) {
//             return NextResponse.json({ message: "User Already Exists" }, { status: 400 });
//         }

//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword
//         });
//         const savedUser = await newUser.save();
//         console.log(savedUser);

//         // Generate JWT Token for Verification
//         const tokenData = {
//             id: savedUser._id
//         };
//         const verificationToken = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1h' });

//         // sendEmail
//         await sendEmail({
//             email,
//             emailType: "VERIFY",
//             userId: savedUser._id,
//             token: verificationToken // Pass the token to be included in the email
//         });

//         return NextResponse.json({
//             message: "User successfully registered. Please verify your email.",
//             success: true,
//             savedUser
//         });

//     } catch (error: any) {
//         console.log(error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

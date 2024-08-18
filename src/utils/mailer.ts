import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/userModels';

export const sendEmail = async ({email, emailType, userId}: any)=>{
    //TODO: configure mailer for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
            { 
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 360000
            })
    }
    else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            { 
                forgetPasswordToken: hashedToken, 
                forgetPasswordTokenExpiry: Date.now() + 360000
            })
    }
    try {
            const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f07036bea85cf1",
              pass: "19419e37d23047"
            }
          });
          const emailOptions = {
            from: 'hasnain@gmail.com',
            to: email, 
            subject: emailType === "VERIFY" ? "verify your account" : "Reset Password", 
            // text: "Hello world?", // plain text body
            html: `${emailType === "VERIFY"? `<p>Click <a href='${process.env.DOMAIN}/verifyEmail?token${hashedToken}'>here</a> to verify you email 
            or copy paste the below link in your browser<br>
            ${process.env.DOMAIN}/verifyEmail?token${hashedToken}
            </p>`: `<p>Click <a href='${process.env.DOMAIN}/resetPassword?token${hashedToken}'>here</a> to reset you password}
            or copy paste the link below in your browser<br>
            ${process.env.DOMAIN}/resetPassword?token${hashedToken}
            </p>`}`, 
          }

          const mailerResponse = transporter.sendMail(emailOptions)

          return mailerResponse

    } catch (error) {
        throw new Error
    }
}

// import nodemailer from 'nodemailer';
// import bcryptjs from 'bcryptjs'
// import User from '@/models/userModels';

// export const sendEmail = async ({email, emailType, userId}: any) => {
//     try {
//         // Hash the user ID to create the token
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//         // Update the user document with the appropriate token
//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate(userId, {
//                 verifyToken: hashedToken, 
//                 verifyTokenExpiry: Date.now() + 360000 // 10 minutes
//             });
//         } else if (emailType === "RESET") {
//             await User.findByIdAndUpdate(userId, {
//                 forgetPasswordToken: hashedToken, 
//                 forgetPasswordTokenExpiry: Date.now() + 360000 // 10 minutes
//             });
//         }

//         // Set up the email transporter
//         const transporter = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//                 user: "f07036bea85cf1",
//                 pass: "19419e37d23047"
//             }
//         });

//         // Prepare the email options
//         const emailOptions = {
//             from: 'hasnain@gmail.com',
//             to: email, 
//             subject: emailType === "VERIFY" ? "Verify Your Account" : "Reset Password", 
//             html: emailType === "VERIFY" 
//                 ? `<p>Click <a href='${process.env.DOMAIN}/verifyEmail?token=${hashedToken}'>here</a> to verify your email 
//                    or copy and paste the below link in your browser<br>
//                    ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
//                    </p>`
//                 : `<p>Click <a href='${process.env.DOMAIN}/resetPassword?token=${hashedToken}'>here</a> to reset your password</a>
//                    or copy and paste the link below in your browser<br>
//                    ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
//                    </p>`,
//         };

//         // Send the email
//         const mailerResponse = await transporter.sendMail(emailOptions);

//         return mailerResponse;

//     } catch (error) {
//         console.log(error);
//         throw new Error('Error sending email');
//     }
// };
// 'use client'

// import axios from 'axios'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'

// function VerifyEmail() {
//     const [ token, setToken] = useState("")
//     const [ error, setError] = useState(false)
//     const [isVerified, setIsVerified] = useState(false)

//     const router = useRouter()

//     const verifyEmail = async() =>{
//         try {
//             await axios.post('/api/users/verifyemail', {token});
//             setIsVerified(true)
//         } catch (error: any) {
//             setError(true)
//             toast.error(error.message)
//             console.log("Error: " + error);
//         }
//     }
//     useEffect(()=> {
//         setError(false)
//         const {query} = router
//         const tokenUrl = query.token
//         setToken(tokenUrl)
//     }, [router])
//     // useEffect(()=> {
//     //     setError(false)

//     // }, [token])
//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
//         <h1 className='text-2xl font-semibold'>Please Verify Yourself</h1>
//         <p>We sent token to your Email, Please Verify to Login</p>

//         {token? 
//             <button
//              className='font-bold text-black bg-orange-500 hover:bg-orange-700 py-2 px-2 rounded-lg'
//              onClick={verifyEmail}>
//                 Verify
//             </button>
//             : 
//             <button className='hidden font-bold text-black bg-orange-500 hover:bg-orange-700 py-2 px-2 rounded-lg'>
//                 Verify
//             </button>}
//             {isVerified && (
//                 <div>
//                     <h2 className="text-2xl">Email Verified</h2>
//                     <Link href={'/login'}>
//                         Login
//                     </Link>
//                 </div>
//             )}
//             {error && (
//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
//                 </div>
//             )}
//     </div>
//   )
// }

// export default VerifyEmail



'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function VerifyEmail() {
    const [token, setToken] = useState("")
    const [error, setError] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    // const router = useRouter()

    // useEffect(() => {
    //     const { query } = router
    //     const tokenUrl: any = query.token
    //     if (tokenUrl) {
    //         setToken(tokenUrl)
    //     }
    // }, [router.query])

    
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    // useEffect(() => {
    //     if(token.length > 0) {
    //         verifyEmail();
    //     }
    // }, [token]);

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setIsVerified(true)
            toast.success('Email verified successfully!')
        } catch (err:any) {
            setError(true)
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
            console.error("Error: ", err);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-2xl font-semibold'>Please Verify Yourself</h1>
            <p>We sent a token to your email. Please verify to login.</p>

            {token ? (
                <button
                    className='font-bold text-black bg-orange-500 hover:bg-orange-700 py-2 px-2 rounded-lg'
                    onClick={verifyEmail}>
                    Verify
                </button>
            ) : (
                <p className='text-red-500'>Invalid token. Please check your email.</p>
            )}
            
            {isVerified && (
                <div className='mt-4'>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link className='text-blue-500 underline' href={'/users//login'}> 
                        Login
                    </Link>
                </div>
            )}
            
            {error && (
                <div className='mt-4'>
                    <h2 className="text-2xl bg-red-500 text-white p-2 rounded-lg">Error occurred while verifying.</h2>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail

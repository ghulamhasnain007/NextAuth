// 'use client'

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast';

// export default function ProfilePage() {

//     const [user, setUser] = useState({})

//     const fetchUser = async() => {
//         try {
//             const response = await axios.post('/api/users/me')
//             console.log(response);
//             setUser(response.data)
//             return response    
//         } catch (error: any) {
//             console.log(error);
//             toast.error(error. message)
//         }
//     }
//     const logoutUser = async() => {
//         try {
//             await axios.get('/api/users/logout')
//         } catch (error: any) {
//             console.log(error);
//             toast.error(error.message)
//         }
//     }
//     useEffect(()=> {
//         fetchUser()
//     }, [])
//   return (
//     <div>
//         <h1 className='text-2xl'>{user.data}</h1>
//         <button
//         className='bg-red-400 text-black px-4 py-2 hover:bg-red-600'
//         onClick={logoutUser}>
//             Logout
//         </button>
//     </div>
//   )
// }

'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface User {
  _id : string; 
  username: string;
  email: string;
  // Add other user fields here
}

export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null);
    const route = useRouter()

    const fetchUser = async() => {
        try {
            const response = await axios.post('/api/users/me');
            console.log(response.data.data);
            setUser(response.data.data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const logoutUser = async() => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully');
            setUser(null); // Reset user state after logout
            route.push('/login')
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=> {
        fetchUser();
    }, []);

    return (
        <div className='flex flex-col justify-center item-center min-h-screen py-2'>
            <h1 className='text-2xl'>{user ? `Welcome, ${user.username}` : 'Loading user data...'}</h1>
            <h2>
                { user ? <Link href={`/profile/${user._id}`}>Profile</Link>: "Nothing"}
                </h2>
            <button
                className='bg-red-400 text-black px-4 py-2 hover:bg-red-600'
                onClick={logoutUser}>
                Logout
            </button>
        </div>
    )
}

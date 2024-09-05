"use client"

import { UserWrapper } from '@/context';
import { useRouter } from 'next/navigation'
import React from 'react'
import Navbar from '@/components/Navbar';

function ContextLayout({children}: any) {
    const router = useRouter();

    function onCreate() {
        router.push('/dashboard/addblog')
    }

    return (
        <UserWrapper>
            {/* <Navbar /> */}
                <div>
                <button
                    className='bg-green-500 text-white p-3 hover:bg-green-700'
                    onClick={onCreate}>
                    Create a New Blog
                </button>
                {children}
            </div>
        </UserWrapper>
    )
}

export default ContextLayout

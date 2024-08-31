"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function ContextLayout({children}: any) {
    const router = useRouter();

    function onCreate() {
        router.push('/dashboard/addblog')
    }

    return (
        <div>
            <button
                className='bg-green-500 text-white p-3 hover:bg-green-700'
                onClick={onCreate}>
                Create a New Blog
            </button>
            {children}
        </div>
    )
}

export default ContextLayout

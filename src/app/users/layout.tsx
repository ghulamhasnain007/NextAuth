import React from 'react'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='overflow-auto'>
        <h1 className='text-2xl font-semibold p-5'>AuthLayout</h1>
        <div>
            {children}
        </div>
    </div>
  )
}

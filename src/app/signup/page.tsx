'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSignUp = async() =>{
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("Sign Up Succesfully: ", user)
      // router.push('/login')
      router.push('/verifyemail')

    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? "Processing" : "Signup"}</h1>
      <hr/>
      <label htmlFor="username">username</label>
      <input
      className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username' 
      placeholder='Input Username'
      value={user.username}
      onChange={(e)=> setUser({...user, username: e.target.value})}
      type='text'/>
      <label htmlFor="email">email</label>
      <input
      className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='email' 
      placeholder='Input email'
      value={user.email}
      onChange={(e)=> setUser({...user, email: e.target.value})}
      type='email'/>
      <label htmlFor="password">password</label>
      <input
      className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='password' 
      placeholder='Input password'
      value={user.password}
      onChange={(e)=> setUser({...user, password: e.target.value})}
      type='password'/>
      <button
      className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      onClick={onSignUp}>
        {buttonDisabled ? "No Sign Up" : "Sign Up"}
      </button>
      <p>Already have an Account? <Link href={'/login'}>Login</Link></p>
    </div>
  )
}


'use client'

// import { useUserContext } from '@/context'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // const {loginUser, setLoginUser} = useUserContext()
  const onLogin = async() =>{
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log("Log in Succesfully: ", user)
      // console.log(response.data)
      // setLoginUser(response.data)
      router.push('/profile')

    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? "Processing" : "Sign in"}</h1>
      <hr/>

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
      onClick={onLogin}>
        {buttonDisabled ? "No Sign in" : "Sign in"}
      </button>
      <p>Don't have an Account? <Link href={'/signup'} className='text-blue-600'>Create One</Link></p>
    </div>
  )
}


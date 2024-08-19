import axios from 'axios'
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
      router.push('/login')

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
      id='username' 
      value={user.username}
      onChange={(e)=> setUser({...user, username: e.target.value})}
      type='text'/>
    </div>
  )
}


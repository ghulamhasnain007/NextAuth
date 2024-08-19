import React, { useState } from 'react'

export default function LoginPage() {

  const [user, setUser] = useState({
    email: "",
    passsword: ""
  })
  
  return (
    <div>Login</div>
  )
}

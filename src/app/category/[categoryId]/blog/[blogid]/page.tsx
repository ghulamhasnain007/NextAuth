"use client"

import { useParams } from 'next/navigation'
import React from 'react'
const params = useParams()


export default function Blog() {
    const {categoryId, blogid} = params

  return (
    <div>Blog
       <p>Category: {categoryId}</p> 
       <p>Blog: {blogid}</p> 
    </div>
  )
}

 
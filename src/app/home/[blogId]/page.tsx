"use client"

import BlogPage, { BlogItem } from '@/components/BlogPage';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Params = {
  blogId: string;
};
// interface Data{
//   data: string
// }
function BlogContent() {

  const params = useParams() as Params;
  const { blogId } = params;
  const [blog, setBlog] = useState<BlogItem | null>(null);


  async function getBlog(){
    try{
      const response = await axios.get(`http://localhost:3000/api/userBlog/${blogId}/readItem`)
      console.log(response.data?.data);
      setBlog(response.data.data)
      
    }
    catch(error: any){
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(()=> {
    getBlog()
  }, [])


  return (
    <div>
        {blog ? <BlogPage blog={blog} /> : <p>Loading...</p>}
    </div>
);
}

export default BlogContent
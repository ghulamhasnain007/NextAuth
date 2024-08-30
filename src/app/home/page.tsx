"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'; // Updated import
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Dashboard() {
  interface BlogItems {
    _id: string;
    title: string;
    description: string;
    // category: string;
    createdAt: string;
    imageUrl: string | null;
    category: {
      title: string
    }
  }

  interface Category {
    title: string,
    blogList: {
      length: number
    }
  }
  const params = useParams();
  const [blogItems, setBlogItems] = useState<BlogItems[]>([]);
  const [title, setTitle] = useState<Category | undefined>(undefined);
  const router = useRouter(); // Correct usage of useRouter

  async function getBlogItems(): Promise<void> {
    try {
      const response = await axios.get(`http://localhost:3000/api/home`);
      console.log(response.data.data);
      
      if (response.data?.data) {
        setBlogItems(response.data.data);
        setTitle(response.data.data.category);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogItems();
  }, []); // Ensure this runs whenever categoryId changes

  const routetoBlog = (blogId: string) => {
    router.push(`/home/${blogId}`);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl grid grid-cols-1 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
          {blogItems.length > 0 ? (
            blogItems.map((post) => (
              <article key={post._id} className="flex flex-col bg-blue-400 p-5 rounded-lg lg:flex-row items-start gap-x-6">
                <img
                  src={post.imageUrl || "https://via.placeholder.com/150x150"}
                  alt={post.title}
                  className="w-48 h-48 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={new Date(post.createdAt).toISOString()} className="text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                    <a
                      href="#"
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.title}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img alt="Author" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">Author Name</p>
                      <p className="text-gray-600">Author Role</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href={`home/${post._id}`} className="text-blue-500 hover:text-blue-700">
                      Read More
                    </Link>
                    <button onClick={() => { routetoBlog(post._id); }} className='text-white bg-green-700 hover:bg-green-900 p-3 ml-4'>
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No blog items available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

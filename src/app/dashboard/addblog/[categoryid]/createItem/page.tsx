"use client"

import React from 'react';
import BlogEditor from '@/components/BlogEditor';
import { useParams } from 'next/navigation';
import { useUserContext } from '@/context';

type Params = {
    categoryid: string;
};

const CreateBlog: React.FC = () => {
    const params = useParams() as Params;
    const {loginUser} = useUserContext()
    const { categoryid } = params;

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-center text-3xl font-semibold py-6">Create a New Blog Post</h1>
            <BlogEditor categoryId={categoryid} loginUser={loginUser}/>
        </div>
    );
};

export default CreateBlog;
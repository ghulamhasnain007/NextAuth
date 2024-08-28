// "use client"

// import { useParams } from 'next/navigation'
// import React from 'react'


// export default function Blog() {
//   const params = useParams()
//   const {categoryId, blogid} = params

//   return (
//     <div>Blog
//        <p>Category: {categoryId}</p> 
//        <p>Blog: {blogid}</p> 
//     </div>
//   )
// }

"use client"

import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';

interface ContentBlock {
  type: 'text' | 'image' | 'video' | 'heading' | 'link';
  content?: string;
  src?: string;
  level?: number;
  href?: string;
}

interface BlogContentProps {
  title: string;
  description: string;
  content: ContentBlock[];
}
// interface Top{
//   response: String = {
//     title: string;
//     description: string
//   }
// }

const BlogContent: React.FC<BlogContentProps> = ({ title, description, content }) => {

  const params = useParams()
  const {categoryId, blogid} = params
  // const [top, setTop] = useState<Top []>([])
  async function getBlogItems(){
    const response = await (`api/categories/${categoryId}/readblogitem/${blogid}`)
    console.log(response)
    // setTop(response)
  }
  useEffect(()=>{
    getBlogItems()
  }, [])
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return <p key={index} className="mb-4 text-gray-800">{block.content}</p>;
      case 'heading':
        return React.createElement(
          `h${block.level}`,
          { key: index, className: `mb-4 font-bold text-gray-900 text-${block.level}xl` },
          block.content
        );
      case 'image':
        return <img key={index} src={block.src} alt={block.content} className="mb-4 w-full rounded-lg shadow-lg" />;
      case 'video':
        return (
          <video key={index} controls className="mb-4 w-full rounded-lg shadow-lg">
            <source src={block.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'link':
        return (
          <a
            key={index}
            href={block.href}
            className="mb-4 text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.content}
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      {/* <div>
        {content.map((block, index) => (
          <div key={index}>{renderContentBlock(block, index)}</div>
        ))}
      </div> */}
    </div>
  );
};

export default BlogContent;

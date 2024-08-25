// "use client"

// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function CategoriesPage() {
//     const [ category, setCategory] = useState({
//         id: "",
//         title: "",
//         description: "",
//         imageUrl: 'https://via.placeholder.com/800x400',
//         numBlogs: 0,
//     })
//     const [ cats, setCats ] = useState([])
//     async function getCategories(){
//         try{
//             const response = await axios.get('/api/blogs/readBlog')
//             console.log(response)
//             setCats(response.data.data)
//             // setCategory(response.data.data)
//             return response
//         }
//         catch(error:any){
//             console.log(error);
//             toast.error(error.message)
//         }
//     }
//     useEffect(()=>{
//         getCategories()
//     }, [])

//     const categories = [
//       {
//         id: 1,
//         title: 'Marketing',
//         description: 'Learn how to grow your business with our expert marketing advice.',
//         imageUrl: 'https://via.placeholder.com/800x400', // Replace with your image URL
//         numOfBlogs: 5,
//       },
//       {
//         id: 2,
//         title: 'Food',
//         description: 'Learn how to grow your business with our expert marketing advice.',
//         imageUrl: 'https://plus.unsplash.com/premium_photo-1676517030798-237e9ef00d15?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your image URL
//         numOfBlogs: 5,
//       },
//       {
//         id: 3,
//         title: 'Marketing',
//         description: 'Learn how to grow your business with our expert marketing advice.',
//         imageUrl: 'https://via.placeholder.com/800x400', // Replace with your image URL
//         numOfBlogs: 5,
//       },
//       {
//         id: 4,
//         title: 'Marketing',
//         description: 'Learn how to grow your business with our expert marketing advice.',
//         imageUrl: 'https://via.placeholder.com/800x400', // Replace with your image URL
//         numOfBlogs: 5,
//       },
//       // More categories...
//     ];

//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:mx-0">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">Blog Categories</h2>
//           <p className="mt-2 text-lg leading-8 text-gray-600">
//             Explore our range of categories and dive into the content that interests you.
//           </p>
//         </div>
//         <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//           {
//             cats.length > 0 ? (

//               cats.map((category, index) => (
//                 <div key={category.id || index} className="group relative">
//                   <div className="overflow-hidden rounded-lg shadow-lg">
//                     <img
//                     //   src={category.imageUrl}
//                       alt={category.title}
//                       className="w-full h-64 object-cover"
//                     />
//                     <div className="absolute inset-0 hover:bg-gray-900 bg-opacity-50 flex items-center justify-center">
//                       <h3 className="text-2xl font-bold text-white">{category.title}</h3>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <p className="text-sm text-gray-500">
//                       {/* {category.numOfBlogs} blogs in this category */}
//                     </p>
//                     <p className="mt-2 text-base text-gray-700">{category.description}</p>
//                     <Link
//                       href={`/category/${category.id}`}
//                       className="mt-4 inline-block text-indigo-600 hover:text-indigo-900"
//                     >
//                       View Blogs
//                     </Link>
//                   </div>
//                 </div>
            
//           ))):(
//             <p className="text-lg text-gray-500">No categories found.</p>

//         ) }
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
    id: string;
    title: string;
    description: string;
    // imageUrl: string;
    // numBlogs: number;
  }
export default function CategoriesPage() {
      
    const [cats, setCats] = useState<Category[]>([]);

    async function getCategories() {
        try {
            const response = await axios.get('/api/blogs/readBlog');
            console.log(response);
            setCats(response.data.data || []);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">Blog Categories</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Explore our range of categories and dive into the content that interests you.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {cats.length > 0 ? (
                        cats.map((category, index) => (
                            <div key={category.id || index} className="group relative">
                                <div className="overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        // src={category.imageUrl || 'https://via.placeholder.com/800x400'}
                                        alt={category.title || 'Category Image'}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 hover:bg-gray-900 bg-opacity-50 flex items-center justify-center">
                                        <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">
                                        {/* {category.numBlogs || 0} blogs in this category */}
                                    </p>
                                    <p className="mt-2 text-base text-gray-700">{category.description}</p>
                                    <Link
                                        href={`/category/${category.id}`}
                                        className="mt-4 inline-block text-indigo-600 hover:text-indigo-900"
                                    >
                                        View Blogs
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg text-gray-500">No categories found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}


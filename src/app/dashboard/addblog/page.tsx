"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import add from '../../../assets/add.png'; // Assuming this path is correct

interface Category {
    _id: string;
    title: string;
    description: string;
}

export default function CategoriesPage() {
    const [cats, setCats] = useState<Category[] | null>(null);

    async function getCategories() {
        try {
            const response = await axios.get('/api/categories/');
            setCats(response.data.data || []);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (cats === null) {
        // While the data is loading, render a consistent placeholder
        return (
            <div className="bg-gray-100 py-24 sm:py-32">
                <div className="text-center text-lg text-gray-500">Loading categories...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                        Blog Categories
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Explore our range of categories and dive into the content that interests you.
                    </p>
                </div>
                <Link href={'/dashboard/addCategory'}>
                    <div className="mt-16 flex justify-start">
                        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-50 transition-all duration-300">
                            <img 
                                className="w-16 h-16 object-cover rounded-full"
                                src={add.src || 'https://via.placeholder.com/800x400'}
                                alt="Add new category"
                            />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Create New Category</h3>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="mt-16 grid max-w-2xl mx-auto gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-3">
                    {cats.length > 0 ? (
                        cats.map((category) => (
                            <div key={category._id} className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <Link href={`/dashboard/addblog/${category._id}/createItem`}>
                                    <div className="overflow-hidden rounded-t-lg">
                                        <img
                                            // Replace with actual image source if available
                                            src={'https://via.placeholder.com/800x400'} 
                                            alt={category.title ?? 'Category Image'}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                            <h3 className="text-2xl font-bold text-white">
                                                {category.title ?? 'No Title'}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-base text-gray-700">
                                            {category.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg text-gray-500">No categories found.</p>
                    )}
                </div>
                {/* <div className="mt-16 flex justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-50 transition-all duration-300">
                        <img 
                            className="w-16 h-16 object-cover rounded-full"
                            src={add.src || 'https://via.placeholder.com/800x400'}
                            alt="Add new category"
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Create New Category</h3>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

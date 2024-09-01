"use client"

import { useUserContext } from '@/context'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function AddCategory() {

    // type Category = {
    //     title: string,
    //     description: string
    // }
    const [ category, setCategory ] = useState({
        title: "",
        description: "",
    })
    const { loginUser } = useUserContext()

    const onSave = () =>{
        try{
            const response = axios.post('http://localhost:3000/api/categories/addcategory', {
                title: category.title,
                description: category.description,
                author: loginUser?._id
            })
    
            console.log(response);

        }
        catch(error: any){
            toast.error(error.message)
            console.log(error);
        }    
    }

  return (
    <div>
        <div>
            <div>
                <label htmlFor='title' className='mt-5'>
                    <h2 className='text-3xl font-bold text-center'>Title</h2>
                    <input
                     id='title' type='text' placeholder='Add Title' className='w-full outline-4'
                      value={category.title} onChange={(e)=> setCategory({...category, title: e.target.value})}/>
                </label>
                <label htmlFor='description'>
                <h2 className='text-3xl font-bold text-center'>Description</h2>
                    <input id='description' type='text' placeholder='Description' className='w-full outline-4'
                    value={category.description} onChange={(e)=> setCategory({...category, description: e.target.value})}/>
                </label>
            </div>
            <div className='justify-center mt-3'>
                <button
                 className='bg-green-600 text-white p-3 hover:bg-green-800'
                 onClick={onSave}>
                    Save
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddCategory
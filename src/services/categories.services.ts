import Blogs from "@/models/blog.model"

const getBlogCategoryById = async (categoryId: any) => {
    try {
        const response = await Blogs.findById(categoryId)
        // const response = await Blogs.findById(categoryId).populate(['createdBy' , 'todoList'])
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default getBlogCategoryById
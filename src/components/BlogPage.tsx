import { GetServerSideProps } from 'next';
import axios from 'axios';

interface ContentBlock {
    type: string;
    content?: string;
    src?: string;
    level?: number;
    href?: string;
}

export interface BlogItem {
    _id: string;
    title: string;
    description: string;
    content: ContentBlock[];
    category: {
        _id: string;
        title: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface BlogPageProps {
    blog: BlogItem;
}

const BlogPage: React.FC<BlogPageProps> = ({ blog }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-lg mb-4">{blog.description}</p>
            <div className="content">
                {blog.content.map((block, index) => {
                    switch (block.type) {
                        case 'text':
                            return <p key={index} className="mb-4">{block.content}</p>;
                        case 'image':
                            return <img key={index} src={block.src} alt="" className="mb-4" />;
                        case 'video':
                            return (
                                <video key={index} controls className="mb-4">
                                    <source src={block.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            );
                        case 'heading':
                            if (block.level === 1) {
                                return <h1 key={index} className="text-3xl font-bold mb-4">{block.content}</h1>;
                            } else if (block.level === 2) {
                                return <h2 key={index} className="text-2xl font-bold mb-4">{block.content}</h2>;
                            } else if (block.level === 3) {
                                return <h3 key={index} className="text-xl font-bold mb-4">{block.content}</h3>;
                            } else {
                                return <h4 key={index} className="text-lg font-bold mb-4">{block.content}</h4>;
                            }
                        case 'link':
                            return (
                                <p key={index} className="mb-4">
                                    <a href={block.href} className="text-blue-500 underline">{block.content}</a>
                                </p>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
            <div className="mt-8 text-sm text-gray-600">
                <p>Category: {blog.category.title}</p>
                <p>Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/userBlog/read/${id}`);
        const blog: BlogItem = response.data.data;

        return {
            props: {
                blog,
            },
        };
    } catch (error) {
        console.error('Error fetching blog:', error);
        return {
            notFound: true,
        };
    }
};

export default BlogPage;

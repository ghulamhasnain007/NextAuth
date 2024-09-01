import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import { useUserContext } from '@/context';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
    ssr: false,
});

const BlogEditor: React.FC<{ categoryId: string, loginUser: any }> = ({ categoryId, loginUser }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // const { loginUser } = useUserContext()
    const onEditorStateChange = (state: EditorState) => {
        setEditorState(state);
    };

    const uploadImageCallBack = (file: File) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ data: { link: reader.result as string } });
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
      });
  };
  

    const saveContent = async () => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const htmlContent = draftToHtml(rawContent);

        try {
            const response = await axios.post(`/api/userBlog/createItem/${categoryId}/addItem`, {
                title,
                description,
                content: htmlContent,
                author: loginUser?._id
            });
           

            if (response.status === 200) {
                console.log('Blog item added successfully:', response.data);
            } else {
                console.error('Error adding blog item:', response.data.message);
            }
        } catch (error: any) {
            console.error('Error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
            />
            <div className="border rounded-md p-4 bg-white shadow-md">
            <Editor
              editorState={editorState}
              toolbarClassName="flex sticky top-0 z-50"
              wrapperClassName="wrapper-class"
              editorClassName="border p-2 min-h-[200px]"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'image', 'remove', 'history'],
                  inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'] },
                  blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'] },
                  fontSize: {
                      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                  },
                  image: {
                      uploadCallback: uploadImageCallBack,
                      alt: { present: true, mandatory: false },
                  },
                  embedded: {
                      defaultSize: {
                          height: 'auto',
                          width: 'auto',
                      },
                  },
              }}
          />
                <button
                    onClick={saveContent}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default BlogEditor;

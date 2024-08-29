// // components/BlogEditor.tsx
// import React, { useState } from 'react';
// import { Editor, EditorState, RichUtils } from 'draft-js';
// import 'draft-js/dist/Draft.css';

// const BlogEditor: React.FC = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const handleKeyCommand = (command: string, editorState: EditorState) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       setEditorState(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   };

//   return (
//     <div className="p-4 border rounded">
//       <Editor
//         editorState={editorState}
//         handleKeyCommand={handleKeyCommand}
//         onChange={setEditorState}
//         placeholder="Write your blog here..."
//       />
//     </div>
//   );
// };

// export default BlogEditor;

"use client"

import React from 'react';
import BlogEditor from '@/components/BlogEditor';
import { useParams } from 'next/navigation';

type Params = {
    categoryId: string;
};

const CreateBlog: React.FC = () => {
    const params = useParams() as Params;
    const { categoryId } = params;

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-center text-3xl font-semibold py-6">Create a New Blog Post</h1>
            <BlogEditor categoryId={categoryId} />
        </div>
    );
};

export default CreateBlog;










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

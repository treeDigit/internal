import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MyEditor = () => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handleEditorChange}
      // Other CKEditor props as needed
    />
  );
};

export default MyEditor;

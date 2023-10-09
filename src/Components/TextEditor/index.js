import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill';

const editorStyle = {
  height: "175px",
  position: "relative"
};

const quillStyle = {
  width: "100%",
  height: "135px",
};
const headingsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
  background: '#f0f0f0',
  position: 'absolute',
  top: '40px',
  left: '0',
  right: '0',
  zIndex: '1',
  color: "#03a803",
  fontWeight: 500,
};


const TextEditor = ({ onSave }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
    onSave(stripHtml(html));
  };
  useEffect(() => {
    // Insert initial content, including headings, when the component mounts
    const initialContent = `
      
    `;
    quillRef.current.getEditor().root.innerHTML = initialContent;
  }, []);

  const stripHtml = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const insertTable = () => {
    const table = prompt('Enter the number of rows and columns (e.g., 3x3):');
    if (table) {
      const [rows, cols] = table.split('x');
      const quill = quillRef.current.getEditor();
      const tableHtml = `<table border="1">${'<tr>'.repeat(rows)}${'<td></td>'.repeat(cols)}</table>`;
      quill.clipboard.dangerouslyPasteHTML(quill.getLength(), tableHtml);
    }
  };

  

  return (
    <div className="text-editor" style={editorStyle}>
      <div style={headingsContainerStyle}>
        <h2 style={{ margin: '0' }}>INDIAN</h2>
        <h2 style={{ margin: '0' }}>OVERSEAS</h2>
      </div>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        style={quillStyle}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'align': [] }],
            ['link'],
            ['image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['table-button'],
          ],
        }}
        onLoad={(quill) => {
          // Access Quill methods after it's loaded
          quill.getModule('toolbar').addHandler('table-button', insertTable);
        }}
      />
    </div>
  );
};

export default TextEditor;

// pages/index.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextTool from '../components/texttool';
import ImageTool from '../components/ImageTool';

const WebsiteEditor = () => {
  const [sections, setSections] = useState([]);

  const addSection = (type) => {
    const newSection = { type, data: type === 'text' ? 'Enter text here' : 'https://via.placeholder.com/150' };
    setSections([...sections, newSection]);
  };

  const updateSection = (index, newData) => {
    const updatedSections = [...sections];
    updatedSections[index].data = newData;
    setSections(updatedSections);
  };

  const deleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const saveWebsite = () => {
    localStorage.setItem('websiteSections', JSON.stringify(sections));
  };

  const downloadWebsite = () => {
    const blob = new Blob([JSON.stringify(sections)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>
          <button onClick={() => addSection('text')}>Add Text</button>
          <button onClick={() => addSection('image')}>Add Image</button>
          <button onClick={saveWebsite}>Save Website</button>
          <button onClick={downloadWebsite}>Download Website</button>
        </div>
        <div>
          {sections.map((section, index) => (
            <div key={index}>
              {section.type === 'text' ? (
                <TextTool text={section.data} onChange={(newText) => updateSection(index, newText)} />
              ) : (
                <ImageTool src={section.data} onChange={(newSrc) => updateSection(index, newSrc)} />
              )}
              <button onClick={() => deleteSection(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default WebsiteEditor;

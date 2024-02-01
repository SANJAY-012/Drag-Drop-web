// components/ImageTool.js
import React from 'react';

const ImageTool = ({ src, onChange }) => {
  return (
    <img
      src={src}
      alt="Draggable Image"
      draggable="false"
      onDoubleClick={() => onChange(prompt('Enter new image URL:'))}
    />
  );
};

export default ImageTool;

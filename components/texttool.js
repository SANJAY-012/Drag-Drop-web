// components/TextTool.js
import React from 'react';

const TextTool = ({ text, onChange }) => {
  return (
    <div contentEditable="true" onInput={(e) => onChange(e.target.innerText)}>
      {text}
    </div>
  );
};

export default TextTool;



// SingleImageUpload.js

import React, { useState } from 'react';

export const ImageSelectComponent = ({file,setFile}) => {
//   const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mx-auto mb-5">
      <h1 className="text-2xl font-bold">Product image</h1>
      <h1 className="text-sm mb-4 text-text/50">Upload product image </h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition border-text/50 bg-input"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="imageUploadInput"
        />
        <label htmlFor="imageUploadInput" className="text-center h-full flex items-center justify-center">
          {file ? (
            <img src={preview} alt="Preview" className="max-h-64" />
          ) : (
            <div>
            <p className="text-text font-medium text-2xl">
              Drag & drop
            </p>
            <p className="text-text font-semibold text-2xl">
              or <span className='text-primary cursor-pointer hover:underline'>browse </span>
            </p>
            </div>
          )}
        </label>
      </div>  
    </div>
  );
};



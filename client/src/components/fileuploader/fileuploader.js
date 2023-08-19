import { useState, useRef } from "react";
import "./fileuploader.css";

const FileUpload = ({ handleFiles }) => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files) {
      handleFiles(files[0]);
    }
  };

  if (files) return (
    <div className="uploads">
      <label>Selected File: {files[0].name}</label>
      <img src={URL.createObjectURL(files[0])} alt="File Preview" />
      <div className="actions">
        <button className="nav-button" onClick={(e) => { e.preventDefault(); setFiles(null); }}>Cancel</button>
        <button className="nav-button" id="upload-button" onClick={handleUpload}>Upload</button>
      </div>
    </div >
  )

  return (
    <>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label>Drag and Drop A File to Upload</label>
        <br />
        <label>Or</label>
        <input
          type="file"
          name="image"
          onChange={(event) => setFiles(event.target.files)}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <br />
        <button className="nav-button" onClick={(e) => {
          e.preventDefault();
          inputRef.current.click();
        }}>Select A File</button>
        <label className="formats">Allowed formats: PNG, JPEG.</label>
      </div>
    </>
  );
};

export default FileUpload;
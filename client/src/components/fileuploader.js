import { useState, useRef } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };

  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll())
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }  
    // )
  };

  if (files) return (
    <div className="uploads">
      <ul>
        {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
      </ul>
      <div className="actions">
        <button className="nav-button" onClick={() => setFiles(null)}>Cancel</button>
        <button className="nav-button" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  )

  return (
    <>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label>Drag and Drop Files to Upload</label>
        <br />
        <label>Or</label>
        <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <br />
        <button className="nav-button" onClick={() => inputRef.current.click()}>Select Files</button>
      </div>
    </>
  );
};

export default FileUpload;
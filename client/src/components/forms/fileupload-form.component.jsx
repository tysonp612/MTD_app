import React from "react";
export const FileUploadForm = () => {
  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
  };
  return (
    <div>
      <label className="btn btn-primary">
        Choose File
        <input
          hidden
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

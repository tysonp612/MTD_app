import React from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "./../../utils/file-upload/file-upload.utils";
// import Resizer from "react-image-file-resizer";

export const FileUploadForm = () => {
  const user = useSelector((state) => state.user.currentUser);
  const fileUploadAndResize = (e) => {
    const files = [...e.target.files];
    files.forEach(
      (file) =>
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            await uploadFiles(uri, user.token)
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          }
        ),
      "base64"
    );
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

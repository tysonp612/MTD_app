import React from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "./../../utils/file-upload/file-upload.utils";
// import Resizer from "react-image-file-resizer";

export const FileUploadForm = ({ values, setValues }) => {
  const allUploadedFiles = values.images;
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
              .then((res) => {
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
                console.log(values.images);
              })
              .catch((err) => console.log(err));
          }
        ),
      "base64"
    );
    console.log(values.images);
    console.log(allUploadedFiles);
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

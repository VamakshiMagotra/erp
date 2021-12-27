import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { imagesRef, filesRef } from "../../firebase";

const FileUpload = ({
  updateDownloadUrl, className,
  children, imageOnly, fileName,
}) => {
  const [btnDisabled, updateBtnDisabled] = useState(false);
  const fileInputRef = useRef(null);

  const handleOnClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const fileRef = ref((imageOnly)?imagesRef:filesRef, `/${fileName}`);
    const file = e.target.files[0];
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        updateBtnDisabled(true);
        console.log("Running");
      },
      (error) => {
        updateBtnDisabled(false);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          updateDownloadUrl(downloadUrl);
        });
        updateBtnDisabled(false);
      }
    );
  };

  const imageString = "image/*";

  return (
    <>
      <button className={className} onClick={handleOnClick} disabled={btnDisabled}>{children}</button>
      <input
        type="file"
        className="d-none"
        ref={fileInputRef}
        onChange={handleChange}
        accept={(imageOnly)? imageString : '*'}
      />
    </>
  );
};

export default FileUpload;
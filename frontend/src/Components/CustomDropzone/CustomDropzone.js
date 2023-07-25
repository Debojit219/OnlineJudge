import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import styles from "./CustomDropzone.module.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Import the green tick icon

function CustomDropzone({
  onFileChange,
  acceptedFiles,
  testCaseFileDescription,
}) {
  const [fileUploaded, setFileUploaded] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFileChange(acceptedFiles[0]);
      setFileUploaded(true);
    },
    accept: acceptedFiles,
    multiple: false,
  });

  return (
    <Box mb={2}>
      <Typography variant="subtitle1">
        Upload {testCaseFileDescription} Text File:
      </Typography>
      <div
        {...getRootProps()}
        className={`${styles["dropzone-container"]} ${
          fileUploaded ? styles["uploaded"] : ""
        }`}
      >
        <input {...getInputProps()} />
        {fileUploaded ? (
          <div className={styles["uploaded-text"]}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={styles["uploaded-icon"]}
            />
            <Typography variant="subtitle2" color="green">
              File Uploaded!
            </Typography>
          </div>
        ) : (
          <p>
            Drag and drop a file
            <br />
            here, or click to select a file
          </p>
        )}
      </div>
    </Box>
  );
}

export default CustomDropzone;

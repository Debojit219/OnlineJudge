import React from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./SuccessPopup.module.css"; // Import the CSS file

const SuccessPopup = () => {
  return (
    <Box className={styles["popup-container"]}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        size="4x"
        className={styles["tick-icon"]}
      />
      <Typography variant="h6" className={styles["success-text"]}>
        Problem Created!
      </Typography>
    </Box>
  );
};

export default SuccessPopup;

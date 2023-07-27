import React, { useState } from "react";
import axios from "axios";
import { Button, Paper, TextField, Box, Typography, Grid } from "@mui/material";
import FileDropZone from "../../Components/CustomDropzone/CustomDropzone";
import SuccessPopup from "../../Components/Popup/SuccessPopup";

const Form = () => {
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [constraint, setConstraints] = useState("");
  const [inputoutput, setInputoutput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [inputTestCaseFile, setInputTestCaseFile] = useState(null);
  const [outputTestCaseFile, setOutputTestCaseFile] = useState(null);
  const [problemCreated, setProblemCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("statement", statement);
    formData.append("constraint", constraint);
    formData.append("inputoutput", inputoutput);
    formData.append("explanation", explanation);
    formData.append("solutionCode", solutionCode);
    formData.append("inputTestCaseFile", inputTestCaseFile);
    formData.append("outputFile", outputTestCaseFile);

    try {
      console.log(formData);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}api/problems/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Problem created successfully:", response.data);
      setProblemCreated(true);
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  };

  return (
    <Box component={Paper} p={4} maxWidth={900} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        Create Problem Form
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          mb: "10px",
        }}
      />
      <TextField
        label="Problem Statement"
        variant="outlined"
        multiline
        fullWidth
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        inputProps={{
          style: {
            height: "300px",
          },
        }}
        sx={{
          mb: "10px",
        }}
      />
      <TextField
        label="Constraints"
        variant="outlined"
        multiline
        fullWidth
        value={constraint}
        onChange={(e) => setConstraints(e.target.value)}
        inputProps={{
          style: {
            height: "100px",
          },
        }}
        sx={{
          mb: "10px",
        }}
      />
      <TextField
        label="Inputs/Outputs"
        variant="outlined"
        multiline
        fullWidth
        value={inputoutput}
        onChange={(e) => setInputoutput(e.target.value)}
        inputProps={{
          style: {
            height: "100px",
          },
        }}
        sx={{
          mb: "10px",
        }}
      />
      <TextField
        label="Explanation"
        variant="outlined"
        multiline
        fullWidth
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        inputProps={{
          style: {
            height: "100px",
          },
        }}
        sx={{
          mb: "10px",
        }}
      />
      <TextField
        label="Solution Code"
        variant="outlined"
        multiline
        fullWidth
        value={solutionCode}
        onChange={(e) => setSolutionCode(e.target.value)}
        inputProps={{
          style: {
            height: "500px",
          },
        }}
        sx={{
          mb: "10px",
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FileDropZone
            onFileChange={setInputTestCaseFile}
            acceptedFiles={[".txt"]}
            testCaseFileDescription="Input"
          />
        </Grid>
        <Grid item xs={6}>
          <FileDropZone
            onFileChange={setOutputTestCaseFile}
            acceptedFiles={[".txt"]}
            testCaseFileDescription="Output"
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {problemCreated && <SuccessPopup />}
    </Box>
  );
};

export default Form;

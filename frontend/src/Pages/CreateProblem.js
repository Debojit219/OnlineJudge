import React, { useState } from "react";
import axios from "axios";
import { Button, Paper, TextField, Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const CustomDropzone = ({
  onFileChange,
  acceptedFiles,
  testCaseFileDescription,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onFileChange(acceptedFiles[0]),
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
        style={{
          borderWidth: "2px",
          borderColor: "gray",
          borderStyle: "dashed",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          margin: "5px",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select a file</p>
      </div>
    </Box>
  );
};

const Form = () => {
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [constraint, setConstraints] = useState("");
  const [inputoutput, setInputoutput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [trivialFile, setTrivialFile] = useState(null);
  const [correctnessFile, setCorrectnessFile] = useState(null);
  const [efficiencyFile, setEfficiencyFile] = useState(null);
  const [trivialOutputFile, setTrivialOutputFile] = useState(null);
  const [correctnessOutputFile, setCorrectnessOutputFile] = useState(null);
  const [efficiencyOutputFile, setEfficiencyOutputFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("statement", statement);
    formData.append("constraint", constraint);
    formData.append("inputoutput", inputoutput);
    formData.append("explanation", explanation);
    formData.append("solutionCode", solutionCode);
    formData.append("trivial", trivialFile);
    formData.append("correctness", correctnessFile);
    formData.append("efficiency", efficiencyFile);
    formData.append("trivialOutput", trivialOutputFile);
    formData.append("correctnessOutput", correctnessOutputFile);
    formData.append("efficiencyOutput", efficiencyOutputFile);

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/problems/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Problem created successfully:", response.data);
      // You can add a redirect or success message here
    } catch (error) {
      console.error("Error creating problem:", error);
      // Handle error here
    }
  };

  return (
    <Box component={Paper} p={4} maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        Problem Form
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

      <Box display="flex">
        <CustomDropzone
          onFileChange={setTrivialFile}
          acceptedFiles={[".txt"]}
          testCaseFileDescription="Trivial Input"
        />
        <CustomDropzone
          onFileChange={setTrivialOutputFile}
          acceptedFiles={[".txt"]}
          testCaseFileDescription="Trivial Output"
        />
      </Box>

      <Box display="flex">
        <CustomDropzone
          onFileChange={setCorrectnessFile}
          acceptedFiles={[".txt"]}
          testCaseFileDescription="Correctness Input"
        />
        <CustomDropzone
          onFileChange={setCorrectnessOutputFile}
          acceptedFiles={[".txt"]}
          testCaseFileDescription="Correctness Output"
        />
      </Box>

      <Box display="flex">
        <CustomDropzone
          onFileChange={setEfficiencyFile}
          acceptedFiles={[".txt"]}
          testCaseFileDescription="Efficiency Input"
        />
        <CustomDropzone
          onFileChange={setEfficiencyOutputFile}
          acceptedFiles={[".txt"]}
          testCaseFileDescription="Efficiency Output"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default Form;

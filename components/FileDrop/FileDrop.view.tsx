import { useEffect } from "react";
import { FileUpload } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

export interface FileDropProps {
  maxFiles?: number;
  onChangeFiles: (files: File[]) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ maxFiles = 0, onChangeFiles }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles,
  });

  useEffect(() => {
    acceptedFiles && onChangeFiles(acceptedFiles);
  }, [acceptedFiles, onChangeFiles]);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        borderRadius: 1,
        border: "2px dashed",
        borderColor: "text.disabled",
        transition: "background 500ms",
        ":hover": {
          bgcolor: "grey.200",
        },
      }}
      {...getRootProps()}
    >
      <Box
        sx={{
          color: "text.secondary",
        }}
      >
        <FileUpload />
      </Box>
      <Box
        sx={{
          color: "text.secondary",
          fontWeight: "bold",
        }}
      >
        Drag and drop some files here, or click to select files
      </Box>
      <input {...getInputProps()} />
    </Box>
  );
};

export default FileDrop;

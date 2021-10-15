import { useEffect } from "react";
import { FileUpload } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export interface FileDropProps {
  maxFiles?: number;
  onChangeFiles: (files: File[]) => void;
  height?: number;
  errorMessage?: string;
}

const FileDrop: React.FC<FileDropProps> = ({
  maxFiles = 0,
  onChangeFiles,
  height = 500,
  errorMessage,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles,
  });

  useEffect(() => {
    acceptedFiles && onChangeFiles(acceptedFiles);
  }, [acceptedFiles, onChangeFiles]);

  return (
    <>
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
          borderRadius: 1,
          border: "1px dashed",
          borderColor: errorMessage ? "error.main" : "text.disabled",
          transition: "background 500ms",
          color: "text.secondary",
          ":hover": {
            bgcolor: "grey.200",
            borderColor: errorMessage ? "error.dark" : "primary.main",
            color: "primary.main",
          },
          height,
          cursor: "pointer",
        }}
        {...getRootProps()}
      >
        <Box>
          <FileUpload />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            파일을 끌어서 놓거나, 클릭해서 선택해주세요
          </Typography>
        </Box>
        <input {...getInputProps()} />
      </Box>
      {errorMessage && (
        <Typography variant="caption" sx={{ color: "error.main", mt: 0.5 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default FileDrop;

import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { convertFileToBase64 } from "~/helpers/imageHelpers";
import FileDrop from "../FileDrop";
import ImageCrop from "../ImageCrop";

export interface SelectAndCropProps {
  onSettleImage: (image: string, file: File) => void;
  errorMessage?: string;
  disabled: boolean;
}

const SelectAndCrop: React.FC<SelectAndCropProps> = ({
  onSettleImage,
  errorMessage,
  disabled,
}) => {
  const [step, setStep] = useState<"select" | "crop" | "notCrop">("select");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleOnChangeFiles = useCallback(async (files: File[]) => {
    if (files[0]) {
      const base64Image = await convertFileToBase64(files[0]);
      setImage(base64Image as string);
      setFile(files[0]);
      setStep("crop");
    }
  }, []);

  const handleOnChangeCrop = useCallback(
    (croppedImage: string) => {
      onSettleImage(croppedImage, file as File);
    },
    [file, onSettleImage],
  );

  useEffect(() => {
    if (step === "notCrop") {
      onSettleImage(image as string, file as File);
    }
  }, [file, image, onSettleImage, step]);

  return (
    <>
      {step === "select" ? (
        <FileDrop
          onChangeFiles={handleOnChangeFiles}
          height={200}
          errorMessage={errorMessage}
        />
      ) : step === "crop" ? (
        <>
          <ImageCrop
            image={image!}
            onChange={handleOnChangeCrop}
            height={400}
            disabled={disabled}
          />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStep("select")}
              disabled={disabled}
            >
              다른 이미지 선택
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStep("notCrop")}
              disabled={disabled}
            >
              원본 유지
            </Button>
          </Stack>
        </>
      ) : step === "notCrop" ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 2,
            }}
          >
            {/* eslint-disable-next-line */}
            <img
              src={image!}
              alt="thumbnail"
              style={{
                maxHeight: 400,
                maxWidth: "100%",
              }}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStep("select")}
              disabled={disabled}
            >
              다른 이미지 선택
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStep("crop")}
              disabled={disabled}
            >
              이미지 편집
            </Button>
          </Stack>
        </>
      ) : null}
    </>
  );
};

export default SelectAndCrop;

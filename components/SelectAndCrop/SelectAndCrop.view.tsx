import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { convertFileToBase64 } from "~/helpers/imageHelpers";
import FileDrop from "../FileDrop";
import ImageCrop from "../ImageCrop";

export interface SelectAndCropProps {
  onSettleImage: (image: string) => void;
}

const SelectAndCrop: React.FC<SelectAndCropProps> = ({ onSettleImage }) => {
  const [step, setStep] = useState<"select" | "crop" | "notCrop">("select");
  const [image, setImage] = useState<string | null>(null);

  const handleOnChangeFiles = useCallback(async (files: File[]) => {
    const base64Image = await convertFileToBase64(files[0]);
    setImage(base64Image as string);
    setStep("crop");
  }, []);

  const handleOnChangeCrop = useCallback(
    (croppedImage: string) => {
      onSettleImage(croppedImage);
    },
    [onSettleImage],
  );

  useEffect(() => {
    if (step === "notCrop") {
      onSettleImage(image as string);
    }
  }, [image, onSettleImage, step]);

  return (
    <>
      {step === "select" ? (
        <FileDrop onChangeFiles={handleOnChangeFiles} />
      ) : step === "crop" ? (
        <>
          <ImageCrop image={image!} onChange={handleOnChangeCrop} height={400} />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button variant="outlined" onClick={() => setStep("select")}>
              Select another image
            </Button>
            <Button variant="outlined" onClick={() => setStep("notCrop")}>
              Not crop
            </Button>
          </Stack>
        </>
      ) : step === "notCrop" ? (
        <>
          <Box>
            {/* eslint-disable-next-line */}
            <img src={image!} alt="thumbnail" />
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button variant="outlined" onClick={() => setStep("select")}>
              Select another image
            </Button>
            <Button variant="outlined" onClick={() => setStep("crop")}>
              Crop
            </Button>
          </Stack>
        </>
      ) : null}
    </>
  );
};

export default SelectAndCrop;

import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { convertFileToBase64, getBase64ImageFromUrl } from "~/helpers/imageHelpers";
import FileDrop from "../FileDrop";
import ImageCrop from "../ImageCrop";

export interface SelectAndCropProps {
  onSelectImage: (file?: File) => void;
  onCropImage: (image?: string) => void;
  errorMessage?: string;
  disabled: boolean;
  defaultValue?: string;
  isCropOnly?: boolean;
  fixedRatio?: number;
}

const SelectAndCrop: React.FC<SelectAndCropProps> = ({
  onSelectImage,
  onCropImage,
  errorMessage,
  disabled,
  defaultValue,
  isCropOnly,
  fixedRatio,
}) => {
  const [step, setStep] = useState<"select" | "crop" | "notCrop">("select");
  const [image, setImage] = useState<string | null>(defaultValue || null);

  const handleOnChangeFiles = useCallback(
    async (files: File[]) => {
      if (files[0]) {
        onSelectImage(files[0]);
        const base64Image = await convertFileToBase64(files[0]);
        setImage(base64Image as string);
        setStep("crop");
      }
    },
    [onSelectImage],
  );

  const handleOnChangeCrop = useCallback(
    (croppedImage: string) => {
      onCropImage(croppedImage);
    },
    [onCropImage],
  );

  const handleOnSelectAgain = useCallback(() => {
    setStep("select");
    onSelectImage(undefined);
    onCropImage(undefined);
  }, [onCropImage, onSelectImage]);

  useEffect(() => {
    if (step === "notCrop") {
      onCropImage(image as string);
    }
  }, [image, onCropImage, step]);

  useEffect(() => {
    if (defaultValue) {
      (async () => {
        const image = await getBase64ImageFromUrl(defaultValue);
        setStep(isCropOnly ? "crop" : "notCrop");
        setImage(image);
      })();
    }
  }, [defaultValue, isCropOnly, onCropImage]);

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
            fixedRatio={fixedRatio}
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
              onClick={handleOnSelectAgain}
              disabled={disabled}
            >
              ?????? ????????? ??????
            </Button>
            {!isCropOnly && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setStep("notCrop")}
                disabled={disabled}
              >
                ?????? ??????
              </Button>
            )}
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
              onClick={handleOnSelectAgain}
              disabled={disabled}
            >
              ?????? ????????? ??????
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStep("crop")}
              disabled={disabled}
            >
              ????????? ??????
            </Button>
          </Stack>
        </>
      ) : null}
    </>
  );
};

export default SelectAndCrop;

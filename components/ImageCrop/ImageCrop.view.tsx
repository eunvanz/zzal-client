import { useCallback, useState } from "react";
import { Box, Slider } from "@mui/material";
import { debounce } from "lodash-es";
import Cropper, { CropperProps } from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import getCroppedImg from "~/helpers/imageHelpers";

export interface ImageCropProps extends Pick<CropperProps, "image" | "aspect"> {
  image: string;
  onChange: (image: string) => void;
}

const ImageCrop: React.FC<ImageCropProps> = ({ image, aspect, onChange }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    debounce(async (_, croppedAreaPixels: Area) => {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      onChange(croppedImg);
    }, 1000),
    [image, onChange],
  );

  return (
    <Box
      sx={{
        display: "relative",
      }}
    >
      <Box
        sx={{
          display: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 80,
          }}
        >
          <Cropper
            image={image}
            aspect={aspect}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            width: "50%",
            transform: "translateX(-50%)",
            height: 80,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="zoom"
            valueLabelDisplay="auto"
            onChange={(_, zoom) => setZoom(zoom as number)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ImageCrop;

import { useCallback, useRef, useState } from "react";
import { Box, Slider, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { debounce } from "lodash-es";
import Cropper, { CropperProps } from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import getCroppedImg from "~/helpers/imageHelpers";

export interface ImageCropProps extends Pick<CropperProps, "image"> {
  image: string;
  onChange: (image: string) => void;
  height?: number;
}

const ImageCrop: React.FC<ImageCropProps> = ({ image, onChange, height = 500 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const rotationRef = useRef<number>(0);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback(
    debounce(async (_, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
      const croppedImg = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotationRef.current,
      );
      onChange(croppedImg);
    }, 1000),
    [image, onChange],
  );

  const onRotationChange = useCallback(
    debounce(async (rotation) => {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels!, rotation);
      onChange(croppedImg);
    }, 1000),
    [image, onChange, croppedAreaPixels],
  );

  return (
    <Box
      sx={{
        position: "relative",
        height,
      }}
    >
      <Box
        sx={{
          position: "absolute",
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
            bottom: 150,
          }}
        >
          <Cropper
            image={image}
            aspect={aspect}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={(v) => {
              setRotation(v);
              rotationRef.current = v;
              onRotationChange(v);
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "stretch",
              height: 50,
            }}
          >
            <Box
              sx={{
                px: 2,
              }}
            >
              <Typography variant="body2" sx={{ width: 60, display: "inline-block" }}>
                Aspect
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1,
                flexGrow: 1,
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="aspect"
                  id="aspect"
                  value={aspect}
                  onChange={(e) => setAspect(e.target.value as number)}
                  label="Aspect"
                >
                  <MenuItem value={1}>1:1</MenuItem>
                  <MenuItem value={4 / 3}>4:3</MenuItem>
                  <MenuItem value={16 / 9}>16:9</MenuItem>
                  <MenuItem value={2 / 1}>2:1</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "stretch",
              height: 50,
            }}
          >
            <Box
              sx={{
                px: 2,
              }}
            >
              <Typography variant="body2" sx={{ width: 60, display: "inline-block" }}>
                Zoom
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                flexGrow: 1,
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
                size="small"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "stretch",
              height: 50,
            }}
          >
            <Box
              sx={{
                px: 2,
              }}
            >
              <Typography variant="body2" sx={{ width: 60, display: "inline-block" }}>
                Rotation
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                flexGrow: 1,
              }}
            >
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="rotation"
                valueLabelDisplay="auto"
                onChange={(_, rotation) => {
                  setRotation(rotation as number);
                  rotationRef.current = rotation as number;
                  onRotationChange(rotation as number);
                }}
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageCrop;

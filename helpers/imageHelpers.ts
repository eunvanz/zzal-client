export const convertFileToBase64 = async (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const convertURLtoFile = async (
  url: string,
  extension?: string,
  fileName?: string,
) => {
  const response = await fetch(url, { mode: "no-cors" });
  const data = await response.blob();
  const ext = extension || url.split(".").pop();
  const filename = fileName || url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], `${filename!}${extension ? `.${extension}` : ""}`, metadata);
};

export const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export const getBase64ImageFromUrl = async (url: string) => {
  const img = await createImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  return dataURL;
};

const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180;
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation: number,
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx!.translate(safeArea / 2, safeArea / 2);
  ctx!.rotate(getRadianAngle(rotation));
  ctx!.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx!.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx!.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx!.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  // As Base64 string
  return canvas.toDataURL("image/png");
}

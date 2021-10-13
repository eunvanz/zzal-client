import { Content } from "~/types";

export const convertContentToPreview = (content: Content) => {
  return {
    path: content.path,
    thumbnail: content.images[0].url,
    title: content.title,
    description: content.description,
  };
};

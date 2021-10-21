import { Content, Pageable } from "~/types";

export const convertContentToPreview = (content: Content) => {
  return {
    path: content.path,
    thumbnail: content.images[0].url,
    title: content.title,
    description: content.description,
  };
};

export const getMergedPageData = <T>(data: Pageable<T>[]) => {
  return data.reduce((prev: T[], item) => [...prev, ...item.items], []);
};

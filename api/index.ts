import { Content } from "~/types";
import requester from "./requester";

const getContent = async (path: string) => {
  const { data } = await requester.get<Content>("/content", {
    params: {
      path,
    },
  });
  return data;
};

export interface CreateContentDto {
  path: string;
  title?: string;
  description?: string;
  images: File[];
}
const postContent = async ({ path, title, description, images }: CreateContentDto) => {
  const formData = new FormData();
  formData.append("path", path);
  title && formData.append("title", title);
  description && formData.append("description", description);
  images.forEach((image) => {
    formData.append("images", image);
  });
  await requester.post("/content", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const api = {
  getContent,
  postContent,
};

export default api;

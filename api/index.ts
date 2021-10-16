import { Content } from "~/types";
import requester from "./requester";

const getContent = async (path: string) => {
  const { data } = await requester.get<Content>("/contents", {
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
  tags: string;
}
const postContent = async ({
  path,
  title,
  description,
  images,
  tags,
}: CreateContentDto) => {
  const formData = new FormData();
  formData.append("path", path);
  title && formData.append("title", title);
  description && formData.append("description", description);
  images.forEach((image) => {
    formData.append("images", image);
  });
  tags.length && formData.append("tags", tags);
  await requester.post("/contents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const checkIsExistingPath = async (path: string) => {
  const { data } = await requester.get<boolean>("/contents/existing", {
    params: {
      path,
    },
  });
  return data;
};

const api = {
  getContent,
  postContent,
  checkIsExistingPath,
};

export default api;

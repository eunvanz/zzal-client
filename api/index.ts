import { Content, CONTENT_ORDER, Pageable, PageRequestOptions } from "~/types";
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

const getRandomContent = async (tagName: string) => {
  const { data } = await requester.get<Content>(
    `/contents/random/${encodeURIComponent(tagName)}`,
  );
  return data;
};

const putContent = async (
  contentId: number,
  { path, title, description, images, tags }: CreateContentDto,
) => {
  const formData = new FormData();
  formData.append("path", path);
  formData.append("title", title || "");
  formData.append("description", description || "");
  images.forEach((image) => {
    formData.append("images", image);
  });
  tags.length && formData.append("tags", tags);
  await requester.put(`/contents/${contentId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface ContentListRequestParams extends PageRequestOptions {
  orderBy: CONTENT_ORDER;
  tags?: string[];
}
const getContentList = async (params: ContentListRequestParams) => {
  const { data } = await requester.get<Pageable<Content>>("/contents", {
    params,
  });
  return data;
};

const api = {
  getContent,
  postContent,
  checkIsExistingPath,
  getRandomContent,
  putContent,
  getContentList,
};

export default api;

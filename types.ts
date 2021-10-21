export interface TimeRecord {
  updatedAt: string;
  createdAt: string;
}

export interface Content extends TimeRecord {
  id: number;
  userId?: string | null;
  path: string;
  title?: string | null;
  description?: string | null;
  viewCnt: number;
  images: Image[];
  tags: Tag[];
}

export interface Image extends TimeRecord {
  id: number;
  url: string;
  seq: number;
  contentId: number;
  type: string;
  width: number;
  height: number;
}

export interface Tag extends TimeRecord {
  id: number;
  name: string;
}

export enum STATE_KEY {
  UPLOADED_CONTENTS = "UPLOADED_CONTENTS",
}

export enum QUERY_KEY {
  EXISTING_CONTENT = "EXISTING_CONTENT",
  CONTENT = "CONTENT",
  CONTENT_LIST = "CONTENT_LIST",
}

export enum CONTENT_ORDER {
  POPULARITY = "popularity",
  LATEST = "latest",
}

export interface Pageable<T> {
  items: T[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PageRequestOptions {
  page?: number;
  limit?: number;
}

export type ExtendableHTMLProps<T extends HTMLElement> = React.HTMLProps<T>;

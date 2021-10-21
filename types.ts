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
}

export enum CONTENT_ORDER {
  POPULARITY = "popularity",
  LATEST = "latest",
}

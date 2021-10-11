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

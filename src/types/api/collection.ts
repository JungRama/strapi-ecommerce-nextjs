import { ImageInterface } from "./image";

export interface CollectionInterface {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageInterface;
}

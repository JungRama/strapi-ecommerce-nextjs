import { ImageInterface } from "./image";

export interface BannerInterface {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: ImageInterface;
}

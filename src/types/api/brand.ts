import { ImageInterface } from "./image";

export interface BrandInterface {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  logo?: ImageInterface;
}

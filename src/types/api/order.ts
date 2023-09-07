import { ImageInterface } from "./image";

export interface OrderInterface {
  order_id: string;
  tracking_code: string | null | undefined;
  stripe_url: string;
  tracking_url: string | null | undefined;
  shipping_name: string;
  subtotal: string;
  shipping_price: string;
  total: string;
  payment_status: string;
  createdAt: string;
  id: number;
  customer_contact: {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    address: string;
    state: string;
    city: string;
    zip_code: string;
    country: string;
  };
  products: {
    id: number;
    items: {
      id: number;
      quantity: number;
      price: string;
      total: string;
      variant: string;
      product_name: string;
      product: {
        id: number;
        name: string;
        description: string;
        short_description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        slug: string;
        thumbnail: ImageInterface;
      };
    }[];
  };
}

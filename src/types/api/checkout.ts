import { ValidationShippingInformationSchema } from "@/components/validations/shipping-information-validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidateAddressInterface {
  isVerified: boolean;
  data: {
    zip4: {
      success: boolean;
      errors: Array<any>;
      details: any;
    };
    delivery: {
      success: boolean;
      errors: Array<any>;
      details: {
        latitude: number;
        longitude: number;
        time_zone: string;
      };
    };
  };
}

export interface RatesInterface {
  id: string;
  rates: RateItemInterface[];
}

export interface RateItemInterface {
  id: string;
  object: string;
  created_at: string;
  updated_at: string;
  mode: string;
  service: string;
  carrier: string;
  rate: string;
  currency: string;
  retail_rate: string;
  retail_currency: string;
  list_rate: string;
  list_currency: string;
  billing_type: string;
  delivery_days: any;
  delivery_date: any;
  delivery_date_guaranteed: boolean;
  est_delivery_days: any;
  shipment_id: string;
  carrier_account_id: string;
}

export interface RequestShippingRateInterface {
  address: ValidationShippingInformationSchema;
  parcel: {
    width?: number;
    length?: number;
    height?: number;
    weight?: number;
  };
}

export interface RequestCheckoutInterface {
  items: {
    id: number;
    image: string;
    display_name: string;
    product_name: string;
    variant_id: number;
    variant_name: string;
    price: number;
    qty: number;
  }[];
  shipping: {
    id?: string;
    id_rate?: string;
    name?: string | null;
    price?: string | null;
  };
  customer: ValidationShippingInformationSchema;
}
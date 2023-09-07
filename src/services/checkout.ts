import axios from "axios";
import { BASE_URL } from "@/static/const";
import { ValidationShippingInformationSchema } from "@/validations/shipping-information-validation";
import {
  RatesInterface,
  RequestCheckoutInterface,
  RequestShippingRateInterface,
  ValidateAddressInterface,
} from "@/types/api/checkout";
import { useSession } from "next-auth/react";

export default function useCheckoutService() {
  const session = useSession();

  /**
   * Validates the given shipping information address.
   *
   * @param {ValidationShippingInformationSchema} data - The shipping information to be validated.
   * @return {Promise<ValidateAddressInterface>} The validated address.
   */
  const validateAddress = async (data: ValidationShippingInformationSchema) => {
    const req = await axios.post(
      BASE_URL + "orders/checkout/validate-address",
      {
        data,
      }
    );

    return req.data as ValidateAddressInterface;
  };

  /**
   * Retrieves the shipping rate for an order checkout.
   *
   * @param {RequestShippingRateInterface} data - The data containing the address and parcel information.
   * @return {Promise<RatesInterface>} The shipping rate for the order checkout.
   */
  const getShippingRate = async (data: RequestShippingRateInterface) => {
    const req = await axios.post(BASE_URL + "orders/checkout/shipping-rate", {
      address: {
        ...data.address,
      },
      parcel: data.parcel,
    });

    return req.data as RatesInterface;
  };

  /**
   * Sends a POST request to the server to create an order with the provided checkout data.
   *
   * @param {RequestCheckoutInterface} data - The data needed for the checkout process, including items, shipping, and customer details.
   * @return {Promise<any>} A promise that resolves to the response data from the server.
   */
  const checkoutItem = async (data: RequestCheckoutInterface) => {
    const req = await axios.post(
      BASE_URL + "orders",
      {
        items: data.items,
        shipping: data.shipping,
        customer: data.customer,
      },
      {
        headers: {
          Authorization: session?.data?.jwt
            ? "Bearer " + session?.data?.jwt
            : undefined,
        },
      }
    );

    return req.data;
  };

  return {
    validateAddress,
    getShippingRate,
    checkoutItem,
  };
}

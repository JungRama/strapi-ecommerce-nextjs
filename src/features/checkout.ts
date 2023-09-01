import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { ValidationShippingInformationSchema } from '@/components/validations/shipping-information-validation';
import { RatesInterface, ValidateAddressInterface } from '@/types/api/checkout';

export const ValidateAddress = async (data: ValidationShippingInformationSchema) => {
  const req = await axios.post(BASE_URL+'orders/checkout/validate-address', {
    data
  })

  return req.data as ValidateAddressInterface
}

export const GetShippingRate = async (data: any) => {
  const req = await axios.post(BASE_URL+'orders/checkout/shipping-rate', {
    address: {
      ...data.address
    },
    parcel: data.parcel
  })

  return req.data as RatesInterface
}

export const CheckoutItem = async (data: any) => {
  const req = await axios.post(BASE_URL+'orders', {
    items: data.items,
    shipping: data.shipping,
    customer: data.customer
  })

  return req.data
}
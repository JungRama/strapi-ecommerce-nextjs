import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { ValidationShippingInformationSchema } from '@/components/validations/shipping-information-validation';
import { RatesInterface, ValidateAddressInterface } from '@/types/api/checkout';

export const ValidateAddress = async (data: ValidationShippingInformationSchema) => {
  const req = await axios.post(BASE_URL+'order/checkout/validate-address', {
    data
  })

  return req.data as ValidateAddressInterface
}

export const GetShippingRate = async (data: any) => {
  const req = await axios.post(BASE_URL+'order/checkout/shipping-rate', {
    address: {
      ...data.address
    },
    parcel: [...data.parcel]
  })

  return req.data as RatesInterface
}
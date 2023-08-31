import { create } from 'zustand'
import _ from 'lodash'
import { ValidationShippingInformationSchema } from '@/components/validations/shipping-information-validation'

type CheckoutStateInterface = {
  currentForm: string,
  setCurrentForm: (value: string) => void,
  formShippingInformation: ValidationShippingInformationSchema,
  setFormShippingInformation: (value: ValidationShippingInformationSchema) => void
}

export const useStoreCheckout = create<CheckoutStateInterface>((set, get): CheckoutStateInterface => ({
  currentForm: 'SHIPPING_INFORMATION',
  setCurrentForm: (value) => set((state) => ({ currentForm: value })),

  formShippingInformation: {
    "name": "",
    "email": "",
    "phone_number": "",
    "street_address": "",
    "country": "",
    "state": "",
    "city": "",
    "zip_code": ""
  },
  setFormShippingInformation: (value) => set((state) => ({ formShippingInformation: value })),
}))
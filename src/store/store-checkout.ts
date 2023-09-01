import { create } from 'zustand'
import _ from 'lodash'
import { ValidationShippingInformationSchema } from '@/components/validations/shipping-information-validation'

type CheckoutStateInterface = {
  currentForm: string,
  setCurrentForm: (value: string) => void,
  formShippingInformation: ValidationShippingInformationSchema,
  setFormShippingInformation: (value: ValidationShippingInformationSchema) => void
  formShippingService: {
    id: string | null,
    name: string | null,
    price: string | null
  },
  setFormShippingService: (value: {
    id: string | null,
    name: string | null,
    price: string | null
  }) => void
}

export const useStoreCheckout = create<CheckoutStateInterface>((set, get): CheckoutStateInterface => ({
  currentForm: 'SHIPPING_INFORMATION',
  setCurrentForm: (value) => set((state) => ({ currentForm: value })),
  formShippingInformation: {
    "name": "Jung Rama",
    "email": "jungrama.id@gmail.com",
    "phone_number": "+6281923123",
    "street_address": "1 E 161st St.",
    "country": "US",
    "state": "New York",
    "city": "Bronx",
    "zip_code": "10452"
  },
  formShippingService: {
    "id": null,
    "name": null,
    "price": null
  },
  setFormShippingInformation: (value) => set((state) => ({ formShippingInformation: value })),
  setFormShippingService: (value) =>  set((state) => ({ formShippingService: value })),
}))
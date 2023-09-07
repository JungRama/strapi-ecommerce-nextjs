import { create } from "zustand";
import { ValidationShippingInformationSchema } from "@/components/validations/shipping-information-validation";

type CheckoutStateInterface = {
  currentForm: string;
  setCurrentForm: (value: string) => void;
  formShippingInformation: ValidationShippingInformationSchema
  setFormShippingInformation: (
    value: ValidationShippingInformationSchema
  ) => void
  formShippingService: {
    id: string | null;
    name: string | null;
    price: string | null;
  }
  setFormShippingService: (value: {
    id: string | null;
    name: string | null;
    price: string | null;
  }) => void
};

// Creates a custom Zustand store for managing the checkout state.
export const useStoreCheckout = create<CheckoutStateInterface>(
  (set): CheckoutStateInterface => ({
    // Initial state for currentForm is "SHIPPING_INFORMATION", value can be ['SHIPPING_INFORMATION', 'SHIPPING_SERVICE'].
    currentForm: "SHIPPING_INFORMATION",

    // This function is used to update the value of currentForm.
    setCurrentForm: (value) => set(() => ({ currentForm: value })),

    // Initial state for formShippingInformation contains sample data for shipping information.
    formShippingInformation: {
      name: "Jung Rama",
      email: "jungrama.id@gmail.com",
      phone_number: "+6281923123",
      street_address: "1 E 161st St.",
      country: "US",
      state: "New York",
      city: "Bronx",
      zip_code: "10452",
    },

    // Initial state for formShippingService contains null values.
    formShippingService: {
      id: null,
      name: null,
      price: null,
    },

    // This function is used to update the value of formShippingInformation.
    setFormShippingInformation: (value) =>
      set(() => ({ formShippingInformation: value })),

    // This function is used to update the value of formShippingService.
    setFormShippingService: (value) =>
      set(() => ({ formShippingService: value })),
  })
);
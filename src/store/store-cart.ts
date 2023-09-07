import { cartLocalStorage } from "@/services/cart";
import { create } from "zustand";
import _ from "lodash";

type CartStateInterface = {
  cartItem: cartLocalStorage[];
  cartProductsIdOnly: () => number[];
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  setCartItem: (value: cartLocalStorage[]) => void;
};

// Creates a custom Zustand store for managing the cart state.
export const useStoreCart = create<CartStateInterface>(
  (set, get): CartStateInterface => ({
    // Initial state for cartItem is an empty array.
    cartItem: [],

    // This function returns an array of unique product IDs from the cartItem array.
    cartProductsIdOnly: () => {
      const uniqueIds = _.uniqBy(get().cartItem, "productId");
      return uniqueIds.map((item) => item.productId) as number[];
    },

    // Initial state for isCartOpen is false.
    isCartOpen: false,

    // This function is used to update the value of isCartOpen.
    setIsCartOpen: (value) => set(() => ({ isCartOpen: value })),

    // This function is used to update the value of cartItem.
    setCartItem: (value: cartLocalStorage[]) =>
      set(() => ({ cartItem: value })),
  })
);
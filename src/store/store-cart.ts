import { cartLocalStorage } from '@/features/cart'
import { create } from 'zustand'
import _ from 'lodash'

type CartStateInterface = {
  cartItem: cartLocalStorage[]
  cartProductsIdOnly: () => number[]
  isCartOpen: boolean
  setIsCartOpen: (value: boolean) => void
  setCartItem: (value: cartLocalStorage[]) => void
}

export const useStoreCart = create<CartStateInterface>((set, get): CartStateInterface => ({
  cartItem: [],
  cartProductsIdOnly: () => {
    const uniqueIds = _.uniqBy(get().cartItem, 'productId')
    return uniqueIds.map(item => item.productId) as number[]
  },
  isCartOpen: false,
  setIsCartOpen: (value) => set((state) => ({ isCartOpen: value })),
  setCartItem: (value: cartLocalStorage[]) => set((state) => ({ cartItem: value })),
}))
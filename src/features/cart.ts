import UseErrorHandler from "@/lib/use-error-handler"
import { ProductInArrayId } from "./products"
import { ProductInterface } from "@/types/api/product"
import { useStoreCart } from "@/store/store-cart"

export interface cartLocalStorage {
  productId: number | null,
  variantId: number | null,
  qty: number | null
}

export const UseCart = () => {
  const { showError } = UseErrorHandler()
  const { setCartItem } = useStoreCart()

   /**
   * Adds a product to the cart.
   *
   * @param {number | null} productId - The ID of the product to add.
   * @param {number | null} variantId - The ID of the variant of the product to add.
   * @param {number} qty - The quantity of the product to add.
   */
  const AddToCart = (productId: number | null, variantId: number | null, qty: number) => {
    const cart = localStorage.getItem('cart')
  
    if(!productId && !variantId) {
      showError('Please select product and the variant!')
      return
    }
    
    if(cart) {
      const cartData = JSON.parse(cart)
      const index = cartData.findIndex((item: cartLocalStorage) => item.productId === productId && item.variantId === variantId)
      
      if(index > -1) {
        cartData[index].qty += qty
      }else {
        cartData.push({
          productId: productId,
          variantId: variantId,
          qty: qty
        })
      }

      localStorage.setItem('cart', JSON.stringify(cartData))
      setCartItem(cartData)
    }else {
      const data = [{
        productId: productId,
        variantId: variantId,
        qty: qty
      }]

      localStorage.setItem('cart', JSON.stringify(data))

      setCartItem(data)
    }
  }

  const UpdateQuantity = (productId?: number | null, variantId?: number | null, qty?: number) => {
    const cart = localStorage.getItem('cart')

    if(!qty) return
    if(!cart) return
    if(qty < 1) return

    const cartData = JSON.parse(cart)
    const index = cartData.findIndex((item: cartLocalStorage) => item.productId === productId && item.variantId === variantId)
    
    if(index > -1) {
      cartData[index].qty = qty
      
      localStorage.setItem('cart', JSON.stringify(cartData))
      setCartItem(cartData)
    }
  }

  /**
  * Retrieves the cart data from local storage.
  *
  * @return {cartLocalStorage[]} The cart data retrieved from local storage, or an empty array if no data is found.
  */
  const GetCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart')
    const cartData: cartLocalStorage[] = JSON.parse(cart as string)

    return cartData ?? []
  }

  /**
  * Retrieves the cart data from local storage and performs several operations to filter and update the cart.
  *
  * @return {Promise<Array>} An array of filtered cart items, each item containing additional product information.
  */
  const GetCart = async () => {
    const cartData = GetCartFromLocalStorage() 

    if(cartData.length > 0) {
      const ids = cartData.map(item => item.productId) as number[]
      const data = await ProductInArrayId(ids)

      // Filter data, if the item in cart and the variant not available on the api. 
      const filteredCartData = cartData.filter(item => {
        const product = data.find(product => item.productId === product.id)
        return product && product.product_variant.find(variant => item.variantId === variant.id)
      })
      
      // Set new cart value with the valid data from api
      localStorage.setItem('cart', JSON.stringify(filteredCartData))
      setCartItem(filteredCartData)

      return filteredCartData.map((item) => {
        const productData = data.find(product => item.productId === product.id)
        const productVariant = productData?.product_variant.find(variant => variant.id === item.variantId)

        return {
          id: productData?.id,
          name: productData?.name,
          variant_id: productVariant?.id,
          variant_name: productVariant?.variant_name,
          price: productVariant?.variant_price
        }
      })
    }

    return []
  }

  const RemoveItemFromCart = (productId?: number | null, variantId?: number | null) => {
    const cart = localStorage.getItem('cart')

    if(!cart) return

    const cartData = JSON.parse(cart)

    const updatedCart = cartData.filter((item: cartLocalStorage) => {
      return !(item.productId === productId && item.variantId === variantId)
    })
    
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItem(updatedCart)
  }

  return {
    AddToCart,
    GetCartFromLocalStorage,
    GetCart,
    UpdateQuantity,
    RemoveItemFromCart
  }
}
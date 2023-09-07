import useErrorHandler from "@/hooks/useErrorHandler";
import { useStoreCart } from "@/store/store-cart";
import { CartInterface } from "@/types/api/cart";
import useProductsService from "./products";

export interface cartLocalStorage {
  productId: number | null;
  variantId: number | null;
  qty: number | null;
}

export const useCartService = () => {
  const { showError } = useErrorHandler();
  const { setCartItem } = useStoreCart();
  const { productInArrayId } = useProductsService();

  /**
   * Adds a product to the cart.
   *
   * @param {number | null} productId - The ID of the product to add.
   * @param {number | null} variantId - The ID of the variant of the product to add.
   * @param {number} qty - The quantity of the product to add.
   */
  const addToCart = (
    productId: number | null,
    variantId: number | null,
    qty: number
  ) => {
    const cart = localStorage.getItem("cart");

    if (!productId && !variantId) {
      showError("Please select product and the variant!");
      return;
    }

    if (cart) {
      const cartData = JSON.parse(cart);
      const index = cartData.findIndex(
        (item: cartLocalStorage) =>
          item.productId === productId && item.variantId === variantId
      );

      if (index > -1) {
        cartData[index].qty += qty;
      } else {
        cartData.push({
          productId: productId,
          variantId: variantId,
          qty: qty,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cartData));
      setCartItem(cartData);
    } else {
      const data = [
        {
          productId: productId,
          variantId: variantId,
          qty: qty,
        },
      ];

      localStorage.setItem("cart", JSON.stringify(data));

      setCartItem(data);
    }
  };

  const updateQuantity = (
    productId?: number | null,
    variantId?: number | null,
    qty?: number
  ) => {
    const cart = localStorage.getItem("cart");

    if (!qty) return;
    if (!cart) return;
    if (qty < 1) return;

    const cartData = JSON.parse(cart);
    const index = cartData.findIndex(
      (item: cartLocalStorage) =>
        item.productId === productId && item.variantId === variantId
    );

    if (index > -1) {
      cartData[index].qty = qty;

      localStorage.setItem("cart", JSON.stringify(cartData));
      setCartItem(cartData);
    }
  };

  /**
   * Retrieves the cart data from local storage.
   *
   * @return {cartLocalStorage[]} The cart data retrieved from local storage, or an empty array if no data is found.
   */
  const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    const cartData: cartLocalStorage[] = JSON.parse(cart as string);

    return cartData ?? [];
  };

  /**
   * Retrieves the cart data from local storage and fetches the corresponding product data from the API.
   * Filters the cart data based on the availability of product variants in the API.
   * Updates the cart in local storage and sets the filtered cart data in the component state.
   * Returns an array of cart items with the required product and variant information.
   *
   * @return {CartInterface[]} An array of cart items with the required product and variant information.
   */
  const getCart = async () => {
    const cartData = getCartFromLocalStorage();

    if (cartData.length > 0) {
      const ids = cartData.map((item) => item.productId) as number[];
      const data = await productInArrayId(ids);

      // Filter data, if the item in cart and the variant not available on the api.
      const filteredCartData = cartData.filter((item) => {
        const product = data.find((product) => item.productId === product.id);
        return (
          product &&
          product.product_variant.find(
            (variant) => item.variantId === variant.id
          )
        );
      });

      // Set new cart value with the valid data from api
      localStorage.setItem("cart", JSON.stringify(filteredCartData));
      setCartItem(filteredCartData);

      return filteredCartData.map((item) => {
        const productData = data.find(
          (product) => item.productId === product.id
        );
        const productVariant = productData?.product_variant.find(
          (variant) => variant.id === item.variantId
        );

        return {
          id: productData?.id,
          image: productData?.thumbnail.url,
          name: productData?.name,
          variant_id: productVariant?.id,
          variant_name: productVariant?.variant_name,
          price: productVariant?.variant_price,
          width: productVariant?.width,
          length: productVariant?.length,
          height: productVariant?.height,
          weight: productVariant?.weight,
        };
      }) as CartInterface[];
    }

    return [] as CartInterface[];
  };

  /**
   * Removes an item from the cart based on the provided productId and variantId.
   *
   * @param {number | null} productId - The ID of the product to be removed from the cart.
   * @param {number | null} variantId - The ID of the variant of the product to be removed from the cart.
   */
  const removeItemFromCart = (
    productId?: number | null,
    variantId?: number | null
  ) => {
    const cart = localStorage.getItem("cart");

    if (!cart) return;

    const cartData = JSON.parse(cart);

    const updatedCart = cartData.filter((item: cartLocalStorage) => {
      return !(item.productId === productId && item.variantId === variantId);
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItem(updatedCart);
  };

  /**
   * Clears the cart by removing the "cart" key from localStorage and setting the cart items to an empty array.
   *
   * @param {none}
   * @return {void}
   */
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItem([]);
  };

  return {
    addToCart,
    getCartFromLocalStorage,
    getCart,
    updateQuantity,
    removeItemFromCart,
    clearCart,
  };
};

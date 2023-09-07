import axios from "axios";
import { BASE_URL } from "@/static/const";
import { FilterProductInterface, ProductInterface } from "@/types/api/product";
import { CollectionInterface } from "@/types/api/collection";

import _ from "lodash";

/**
 * Retrieves the featured sneakers from the API.
 *
 * @return {ProductInterface} The featured sneakers.
 */
export const getFeaturedSneakers = async () => {
  const req = await axios.get(BASE_URL + "featured-sneaker", {
    params: {
      populate: [
        "products.images",
        "products.thumbnail",
        "products.product_variant",
        "products.brand",
        "products.category",
      ],
    },
  });

  return req.data.data.products as ProductInterface[];
};

/**
 * Retrieves collections from the server.
 *
 * @return {Promise<CollectionInterface[]>} An array of collections.
 */
export const getCollections = async () => {
  const req = await axios.get(BASE_URL + "collections", {
    params: {
      pagination: {
        limit: -1,
      },
      populate: ["image"],
    },
  });

  return req.data.data as CollectionInterface[];
};

/**
 * Retrieves the highest priced product from the API.
 *
 * @return {ProductInterface} The highest priced product.
 */
export const getHighestProductPrice = async () => {
  const req = await axios.get(BASE_URL + "products", {
    params: {
      pagination: {
        limit: 1,
      },
      populate: ["product_variant"],
      sort: ["product_variant.variant_price:DESC", "id:ASC"],
    },
  });

  return req.data.data[0] as ProductInterface;
};

/**
 * Retrieves the products from the API.
 *
 * @return {ProductInterface} The featured sneakers.
 */
export const getProducts = async (
  filter?: FilterProductInterface,
  page: string = "1"
) => {
  const req = await axios.get(BASE_URL + "products", {
    params: {
      pagination: {
        pageSize: 24,
        page,
      },
      populate: ["thumbnail", "product_variant", "brand", "category"],
      sort: (() => {
        if (filter?.sort === "price-low-high") {
          return ["product_variant.variant_price:ASC", "name:ASC"];
        } else if (filter?.sort === "price-high-low") {
          return ["product_variant.variant_price:DESC", "name:ASC"];
        } else {
          return ["createdAt:DESC"];
        }
      })(),
      filters: {
        $and: [
          {
            collections: {
              slug: {
                $eq: filter?.collection ?? undefined,
              },
            },
          },
          {
            product_variant: {
              variant_price: {
                $gte: filter?.minPrice ?? undefined,
                $lte: filter?.maxPrice ?? undefined,
              },
            },
          },
          {
            brand: {
              slug: {
                $eq: filter?.brand ?? undefined,
              },
            },
          },
          {
            category: {
              slug: {
                $eq: filter?.category ?? undefined,
              },
            },
          },
          {
            product_variant: {
              variant_price: {
                $gt: filter?.minPrice ?? undefined,
              },
            },
          },
        ],
      },
    },
  });

  const data = req.data.data;

  // NOTE: Currently strapi facing problem when product deep sorting
  // for example product_variant.variant_price:DESC. It will duplicate
  // the some products. That why we need to remove duplicate products
  // within this function
  const uniqueIds = _.uniqBy<ProductInterface>(data, "id");

  // return data with unique id
  return {
    data: uniqueIds,
    pagination: req.data?.meta?.pagination,
  };
};

/**
 * Retrieves the details of a product by its slug.
 *
 * @param {string} slug - The slug of the product.
 * @return {ProductInterface} The product details.
 */
export const getProductDetail = async (slug: string) => {
  const req = await axios.get(BASE_URL + "products/" + slug, {
    params: {
      populate: ["images", "product_variant", "brand", "category"],
    },
  });

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3000);
  // });

  return req.data.data as ProductInterface;
};

/**
 * Retrieves products from the API based on the given array of product IDs.
 *
 * @param {number[]} idProducts - An array of product IDs.
 * @return {ProductInterface[]} - An array of product data.
 */
export const productInArrayId = async (idProducts: number[]) => {
  const req = await axios.get(BASE_URL + "products", {
    params: {
      pagination: {
        limit: -1,
      },
      populate: ["thumbnail", "product_variant", "brand", "category"],
      filters: {
        id: {
          $in: idProducts,
        },
      },
    },
  });

  return req.data.data as ProductInterface[];
};

/**
 * Searches for products based on the given search string.
 *
 * @param {string} search - The search string to filter products by name.
 * @return {ProductInterface[]} - An array of products that match the search query.
 */
export const searchProduct = async (search: string) => {
  if (search.length <= 0) {
    return [] as ProductInterface[];
  }

  const req = await axios.get(BASE_URL + "products", {
    params: {
      populate: ["thumbnail", "product_variant", "brand", "category"],
      pagination: {
        limit: 5,
      },
      filters: {
        name: {
          $contains: search,
        },
      },
    },
  });

  return req.data.data as ProductInterface[];
};

import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { ProductInterface } from '@/types/api/product';
import { CollectionInterface } from '@/types/api/collection';


/**
 * Retrieves the featured sneakers from the API.
 *
 * @return {ProductInterface} The featured sneakers.
 */
export const GetFeaturedSneakers = async () => {
  const req = await axios.get(BASE_URL+'featured-sneaker', {
    params: {
      populate: [
        'products.thumbnail',
        'products.product_variant',
        'products.brand',
        'products.category',
      ],
    }
  })

  return req.data.data.products as ProductInterface[]
}

/**
 * Retrieves collections from the server.
 *
 * @return {Promise<CollectionInterface[]>} An array of collections.
 */
export const GetCollections = async () => {
  const req = await axios.get(BASE_URL+'collections', {
    params: {
      populate: [
        'image',
      ],
    }
  })

  return req.data.data as CollectionInterface[]
}

/**
 * Retrieves the products from the API.
 *
 * @return {ProductInterface} The featured sneakers.
 */
export const GetProducts = async () => {
  const req = await axios.get(BASE_URL+'products', {
    params: {
      populate: [
        'thumbnail',
        'product_variant',
        'brand',
        'category',
      ],
      filters: {
        // brand: {
        //   slug: {
        //     $eq: 'adidas'
        //   }
        // },
        category: {
          slug: {
            $eq: 'men'
          }
        }
      }
    }
  })

  // await new Promise(resolve => setTimeout(resolve, 20000))

  return req.data.data as ProductInterface[]
}
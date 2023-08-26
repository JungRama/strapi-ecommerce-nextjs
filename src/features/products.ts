import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { FilterProductInterface, ProductInterface } from '@/types/api/product';
import { CollectionInterface } from '@/types/api/collection';

import _ from 'lodash'

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
      pagination: {
        limit: -1,
      },
      populate: [
        'image',
      ],
    }
  })

  return req.data.data as CollectionInterface[]
}

export const getHighestProductPrice = async () => {
  const req = await axios.get(BASE_URL+'products', {
    params: {
      pagination: {
        limit: 1,
      },
      populate: [
        'product_variant',
      ],
      sort: [
        'product_variant.variant_price:DESC',
        'id:ASC',
      ],
    }
  })

  return req.data.data[0] as ProductInterface
}

/**
 * Retrieves the products from the API.
 *
 * @return {ProductInterface} The featured sneakers.
 */
export const GetProducts = async (filter?: FilterProductInterface) => {
  const req = await axios.get(BASE_URL+'products', {
    params: {
      populate: [
        'thumbnail',
        'product_variant',
        'brand',
        'category',
      ],
      sort: (() => {
        console.log(filter);
        
        if(filter?.sort === 'price-low-high') {
          return ['product_variant.variant_price:ASC', 'name:ASC']
        }else if(filter?.sort === 'price-high-low') {
          return ['product_variant.variant_price:DESC', 'name:ASC']
        }else {
          return ['createdAt:DESC']
        }
      })(),
      filters: {
        $and: [
          {
            collections: {
              slug: {
                $eq: filter?.collection ?? undefined
              }
            }
          },
          {
            product_variant: {
              variant_price: {
                $gte: filter?.minPrice ?? undefined,
                $lte: filter?.maxPrice ?? undefined
              }
            }
          },
          {
            brand: {
              slug: {
                $eq: filter?.brand ?? undefined
              }
            },
          },
          {
            category: {
              slug: {
                $eq: filter?.category ?? undefined
              }
            }
          },
          {
            product_variant: {
              variant_price: {
                $gt: filter?.minPrice ?? undefined
              }
            }
          }
        ]
      }
    }
  })

  // await new Promise(resolve => setTimeout(resolve, 20000))
  

  const data = req.data.data

  const uniqueIds = _.uniqBy<ProductInterface>(data, 'id')

  return uniqueIds as ProductInterface[]
}
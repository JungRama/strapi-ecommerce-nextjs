import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { ReviewInterface } from '@/types/api/review';

export const GetProductReviews = async (slug: string) => {
  const req = await axios.get(BASE_URL+'product-reviews/'+slug, {
    params: {
      pagination: {
        limit: -1
      },
      filters: {
        show_review: {
          $eq: true
        },
        product: {
          slug: {
            $eq: slug
          }
        }
      }
    }
  })

  return req.data.data as ReviewInterface[]
}

export const GetProductReviewCount = async (slug: string) => {
  const req = await axios.get(BASE_URL+'product-reviews/'+slug+'/count')

  return req.data as {
    totalReviews: number,
    averageRating: number
  }
}
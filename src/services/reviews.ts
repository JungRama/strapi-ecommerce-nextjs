import axios from "axios";
import { BASE_URL } from "@/static/const";
import { ReviewInterface } from "@/types/api/review";

/**
 * Retrieves the product reviews for a given slug.
 *
 * @param {string} slug - The slug of the product.
 * @return {Promise<ReviewInterface[]>} - A promise that resolves to an array of product reviews.
 */
export const getProductReviews = async (slug: string) => {
  const req = await axios.get(BASE_URL + "product-reviews/", {
    params: {
      pagination: {
        limit: -1,
      },
      filters: {
        show_review: {
          $eq: true,
        },
        product: {
          slug: {
            $eq: slug,
          },
        },
      },
    },
  });

  return req.data.data as ReviewInterface[];
};

/**
 * Retrieves the total number of product reviews and the average rating for a given product slug.
 *
 * @param {string} slug - The slug of the product.
 * @return {Promise<{totalReviews: number, averageRating: number}>} - The total number of reviews and the average rating.
 */
export const getProductReviewCount = async (slug: string) => {
  const req = await axios.get(BASE_URL + "product-reviews/" + slug + "/count");

  return req.data as {
    totalReviews: number;
    averageRating: number;
  };
};

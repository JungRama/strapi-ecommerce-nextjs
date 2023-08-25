import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { BrandInterface } from '@/types/api/brand';

/**
 * Retrieves a list of brands from the server.
 *
 * @return {BrandInterface[]} An array of brand objects.
 */
export const GetBrands = async () => {
  const req = await axios.get(BASE_URL+'brands', {
    params: {
      populate: 'logo'
    }
  })
  
  return req.data.data as BrandInterface[]
}
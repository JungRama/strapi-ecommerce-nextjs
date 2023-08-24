import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { BannerInterface } from '@/types/api/banner';

export const GetBanners = async () => {
  const req = await axios.get(BASE_URL+'banners', {
    params: {
      populate: 'image'
    }
  })

  return req.data.data as BannerInterface[]
}
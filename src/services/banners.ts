import axios from "axios";
import { BASE_URL } from "@/static/const";
import { BannerInterface } from "@/types/api/banner";


export default function useBannersService(){
  /**
  * Retrieves the banners from the API.
  *
  * @return {BannerInterface[]} An array of banner objects.
  */
  const getBanners = async () => {
    const req = await axios.get(BASE_URL + "banners", {
      params: {
        populate: "image",
      },
    });

    return req.data.data as BannerInterface[];
  };

  return {
    getBanners
  }
}
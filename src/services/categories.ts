import axios from "axios";
import { BASE_URL } from "@/static/const";
import { CategoryInterface } from "@/types/api/category";

export default function useCategoriesService(){
  /**
  * Retrieves the categories from the server.
  *
  * @return {Promise<CategoryInterface[]>} An array of CategoryInterface objects representing the categories.
  */
  const getCategories = async () => {
    const req = await axios.get(BASE_URL + "categories");

    return req.data.data as CategoryInterface[];
  };

  return {
    getCategories
  }
}
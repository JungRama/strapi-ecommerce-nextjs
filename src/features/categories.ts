import axios from 'axios';
import { BASE_URL } from '@/features/const';
import { CategoryInterface } from '@/types/api/category';

export const GetCategories = async () => {
  const req = await axios.get(BASE_URL+'categories')

  return req.data.data as CategoryInterface[]
}
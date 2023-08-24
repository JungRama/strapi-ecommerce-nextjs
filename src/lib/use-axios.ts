import axios, { Method } from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

interface useAxiosInterface {
  url: string,
  method: Method,
  params?: object,
  body?: any | null,
  headers?: any | null,
}

interface FetchDataResult<T> {
  response: T | null;
  error: any;
  loading: boolean;
}

const UseAxios = async <T>({ url, method, params, body = null, headers = null }: useAxiosInterface): Promise<FetchDataResult<T>> => {
    let response = <T | null>(null);
    let error = null;
    let loading = true;

    const fetchData = async () => {
      await axios(url, {
        method: method,
        params: params,
        headers: headers,
        data: body
      })
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        error = err?.response?.data.error;
      })
      .finally(() => {
          loading = false;
      });
    };

    await fetchData();

    return { response, error, loading };
};

export default UseAxios;
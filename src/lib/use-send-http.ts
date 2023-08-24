import axios, { AxiosHeaders, Method } from 'axios'

interface reqArgument {
  method: Method,
  params?: any,
  body?: any,
  headers?: AxiosHeaders
}

export const sendRequest = async (url: string, { arg }: { arg: reqArgument }) => {
  const res = await axios(url, {
    method: arg.method,
    params: arg?.params,
    headers: arg?.headers,
    data: arg?.body
  })

  return res
}
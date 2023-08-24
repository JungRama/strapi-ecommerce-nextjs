import UseAxios from '@/lib/use-axios';
import { BASE_URL } from './const';

export interface RequestSignInCredential {
  email: string,
  password: string
}

export interface RequestSignInWithProviders {
  provider?: string,
  access_token?: string
}

export interface RequestSignUpCredential {
  name: string,
  email: string,
  password: string
}

export interface ResponseAuth {
  user: {
    email: string,
    name: string,
    blocked: boolean,
    id: string
  },
  jwt: string
}

/* ------------------------- SIGN IN WITH LOCAL / CREDENTIALS ------------------------- */

export async function signInWithCredential( req: RequestSignInCredential ) {
  const { response, error, loading } = await UseAxios<ResponseAuth>({
    url: `${BASE_URL}auth/local`,
    method: 'POST',
    body: {
      identifier: req.email,
      password: req.password
    }
  })

  return { response, error, loading }
}

/* ------------------------- SIGN IN WITH PROVIDERS ------------------------- */

export async function signInWithProviders( req: RequestSignInWithProviders ) {
  const { response, error, loading } = await UseAxios<ResponseAuth>({
    url: `${BASE_URL}auth/${req?.provider}/callback?access_token=${req?.access_token}`,
    method: 'GET'
  })

  return { response, error, loading }
}

/* --------------------------- SIGN UP WITH EMAIL --------------------------- */
export async function signUpWithCredential( data: RequestSignUpCredential ) {
  console.log(BASE_URL);
  

  const { response, error, loading } = await UseAxios<ResponseAuth>({
    url: `${BASE_URL}auth/local/register`,
    method: 'POST',
    body: {
      name: data.name,
      email: data.email,
      username: data.email,
      password: data.password
    }
  })

  return { response, error, loading }
}
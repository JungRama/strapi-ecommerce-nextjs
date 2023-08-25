import UseAxios from '@/lib/use-axios';
import { BASE_URL } from './const';
import { RequestSignInCredential, RequestSignInWithProviders, RequestSignUpCredential, ResponseAuth } from '@/types/api/auth';

/**
 * Signs in a user with the provided credential.
 *
 * @param {RequestSignInCredential} req - The request object containing the email and password.
 * @return {{ response: ResponseAuth, error: any, loading: boolean }} - The response object containing the response, error, and loading status.
 */
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

/**
 * Signs in with providers.
 *
 * @param {RequestSignInWithProviders} req - The request object containing the provider and access token.
 * @return {Promise<{ response: ResponseAuth; error: any; loading: boolean }>} - An object containing the response, error, and loading status.
 */
export async function signInWithProviders( req: RequestSignInWithProviders ) {
  const { response, error, loading } = await UseAxios<ResponseAuth>({
    url: `${BASE_URL}auth/${req?.provider}/callback?access_token=${req?.access_token}`,
    method: 'GET'
  })

  return { response, error, loading }
}

/**
 * Sign up a user with the provided credential.
 *
 * @param {RequestSignUpCredential} data - The data object containing the user's signup credentials.
 * @return {Promise<{ response: ResponseAuth; error: any; loading: boolean }>} - The response object containing the authenticated user, any error that occurred, and the loading status.
 */
export async function signUpWithCredential( data: RequestSignUpCredential ) {
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
import { BASE_URL } from "../static/const";
import {
  RequestSignInCredential,
  RequestSignInWithProviders,
  RequestSignUpCredential,
  ResponseAuth,
} from "@/types/api/auth";
import axios from "axios";

export async function signInWithCredential(req: RequestSignInCredential) {
  try {
    const response = await axios.post(`${BASE_URL}auth/local`, {
      identifier: req.email,
      password: req.password,
    });

    return response.data as ResponseAuth;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.data?.error) {
      throw error.response.data.error.message;
    } else {
      throw error;
    }
  }
}

export async function signInWithProviders(req: RequestSignInWithProviders) {
  try {
    const response: ResponseAuth = await axios.get(
      `${BASE_URL}auth/${req?.provider}/callback?access_token=${req?.access_token}`
    );

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.data?.error) {
      throw error.response.data.error.message;
    } else {
      throw error;
    }
  }
}

export async function signUpWithCredential(data: RequestSignUpCredential) {
  try {
    const response: ResponseAuth = await axios.post(
      `${BASE_URL}auth/local/register`,
      {
        name: data.name,
        email: data.email,
        username: data.email,
        password: data.password,
      }
    );

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.data?.error) {
      throw error.response.data.error.message;
    } else {
      throw error;
    }
  }
}

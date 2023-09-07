export interface RequestSignInCredential {
  email: string;
  password: string;
}

export interface RequestSignInWithProviders {
  provider?: string;
  access_token?: string;
}

export interface RequestSignUpCredential {
  name: string;
  email: string;
  password: string;
}

export interface ResponseAuth {
  user: {
    email: string;
    name: string;
    blocked: boolean;
    id: string;
  };
  jwt: string;
}


import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { signInWithCredential, signInWithProviders } from '@/features/auth';


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_KEY as string,
      clientSecret: process.env.GOOGLE_SECRET_KEY as string,
    }),
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
        */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const {response, error} = await signInWithCredential({
            email: credentials.email,
            password: credentials.password,
          });

          if(error) {
            throw error?.message
          }

          if(response) {
            return {
              ...response.user,
              jwt: response.jwt
            }
          }else {
            return null
          }
          
        } catch (error: any) {
          // Sign In Fail
          throw new Error(error)
        }
      },
    }),
  ],
  callbacks: {
    // The session callback is called whenever a session is checked. 
    // By default, only a subset of the token is returned for increased security.
    session: async ({ session, token }) => {
      // Send properties to the client, like an access_token from a provider.
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in) 
    // or updated (i.e whenever a session is accessed in the client).
    // TODO: CHECKING IF USER IS BLOCKED OR NOT
    jwt: async ({ token, user, account }) => {
      // Persist the OAuth access_token to the token right after signin
      const isSignIn = user ? true : false;
      
      if (isSignIn) {
        // If provider credential. just set the user id and jwt token because its already fetched
        if(account?.provider === 'credentials') {
          token.id = user.id
          token.jwt = user.jwt
        }
        // else, you need to fetch to the backend with the access token
        else {
          const { response } = await signInWithProviders({
            provider: account?.provider,
            access_token: account?.access_token
          })

          if(response) {
            token.id = response.user?.id
            token.jwt = response.jwt
          }
        }
      }
      
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/login'
  }
});
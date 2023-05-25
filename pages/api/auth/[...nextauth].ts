import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const AZURE_AD_AUTH_BASE_URL = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0`;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "",
      authorization: {
        url: `${AZURE_AD_AUTH_BASE_URL}/authorize`,
        params: {
          scope: process.env.AZURE_AD_SCOPE,
        },
      },
      token: {
        url: `${AZURE_AD_AUTH_BASE_URL}/token`,
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      console.log(token);
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);

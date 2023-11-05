import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { serverSideFetch } from "@/misc/fetchOperations";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const body = JSON.stringify({ username: credentials.username, password: credentials.password });
        const result = await serverSideFetch({ endPoint: "/sign-in", method: "POST", noAuth: true, body });

        if (result.ok) {
          const obj = result.body;
          return { name: obj.username, email: obj.email };
        } else {
          return null;
        }
      },
    }),
  ],
  redirect: false,
  pages: {
    error: "/",
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

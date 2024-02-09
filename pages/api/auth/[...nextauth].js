import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/auth";
import clientPromise from "@/lib/mongoDb";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("employeeDashboard");

        const userData = await db.collection("employee").findOne({
          email: credentials.email,
        });

        if (!userData) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          userData.password
        );

        if (!isValid) {
          throw new Error("Invalid Credentials");
        }
        const user = { id: userData.employee_id , email:userData.email}

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.employeeId = token.id
      
      return session
    },
    async jwt({ token, account, profile,user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.id = user.id
        }
        return token
      }
  }
});

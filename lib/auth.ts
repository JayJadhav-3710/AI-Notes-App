import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "@/lib/mongodb";
import type { AuthOptions, SessionStrategy } from "next-auth";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.userId = user.email;
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.userId || token.sub;
        session.user.email = token.email;
      }
      return session;
    },
    async signIn({ user }: any) {
      try {
        await dbConnect();
        await User.findOneAndUpdate(
          { email: user.email },
          {
            _id: user.email,
            name: user.name,
            email: user.email,
            image: user.image,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (e) {
        console.error("User upsert error:", e);
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
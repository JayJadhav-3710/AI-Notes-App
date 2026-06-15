import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "@/lib/mongodb";
import type { AuthOptions, SessionStrategy } from "next-auth";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

const authOptions: AuthOptions = {
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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        // Use email as the consistent user ID
        token.userId = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        // Use the consistent user ID from token
        session.user.id = token.userId || token.sub;
        session.user.email = token.email;
      }
      return session;
    },
    async signIn({ user }: { user: any }) {
      // Upsert user in User collection with consistent ID
      try {
        await dbConnect();
        await User.findOneAndUpdate(
          { email: user.email },
          {
            _id: user.email, // Use email as the consistent ID
            name: user.name,
            email: user.email,
            image: user.image,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (e) {
        // Log but allow sign in
        console.error("User upsert error:", e);
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions }; 
import { ConnectMongodb } from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import /*normally login karna without google provider*/ CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  /*give detail info */ providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials /*data pass through parameter*/) {
        // logic for login page
        const { email, password } = credentials;

        try {
          await ConnectMongodb();
          const user = await User.findOne({ email });
          // If value is null or empty nextauth will consider as "Invalid email & password"
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          // If value is null or empty nextauth will consider as "Invalid email & password"
          if (!passwordMatch) return null;

          return user;
        } catch (error) {
          console.log("Error on Auth file in server side", error);
        }
      },
    }),
  ],
  // session is like storing data of user on temporarily
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // authentication were to perform
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

// through handler we can get thing and post things on authOptions through NextAuth
// now handler is able to get thing form user and post thing on database
export { handler as GET, handler as POST };

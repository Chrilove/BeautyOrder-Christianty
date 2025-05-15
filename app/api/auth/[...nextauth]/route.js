// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// NextAuth.js setup configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // If username and password are correct, return user object
        if (credentials.username === "admin" && credentials.password === "admin") {
          return { id: 1, name: "Admin", email: "admin@example.com" };
        }
        // Otherwise return null to indicate failed login
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token if available
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data from token to the session
      session.user = token.user;
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key-change-this-in-production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

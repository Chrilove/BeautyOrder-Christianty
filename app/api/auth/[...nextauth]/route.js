// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// NextAuth.js setup
export const handler = NextAuth({
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
    signIn: '/login', // Redirect to the login page
  },
  session: {
    strategy: "jwt", // Use JWT strategy for sessions
  },
});

// Export GET and POST methods to handle requests
export { handler as GET, handler as POST };

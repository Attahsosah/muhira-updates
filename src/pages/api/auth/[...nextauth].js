import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const FIREBASE_API_KEY = "AIzaSyBuaLG3188ZJpJvV8c0UXQMwKesFxlQm8c";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                returnSecureToken: true,
              }),
            }
          );
          const data = await res.json();
          if (res.ok && data.email) {
            return {
              id: data.localId,
              email: data.email,
              name: data.displayName || data.email,
              isAdmin: ADMIN_EMAILS.includes(data.email.toLowerCase()),
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = session.user.name
        .split(" ")
        .join("_")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      session.user.isAdmin = token.isAdmin ?? false;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);

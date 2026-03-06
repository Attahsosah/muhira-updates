import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const FIREBASE_API_KEY = "AIzaSyBuaLG3188ZJpJvV8c0UXQMwKesFxlQm8c";

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
    async session({ session, token }) {
      session.user.username = session.user.name
        .split(" ")
        .join("_")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from "@/db/models/db.model";

const dev = process.env.NODE_ENV !== "production";
const getserver = dev
  ? "http://localhost:3000"
  : "https://musereads.vercel.app";

try {
  const sqlAuth = async () => {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
    // await sequelize.sync({ force: true }); // force create tables (disable in production)
  };
  sqlAuth();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const res = await fetch(`${getserver}/api/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log(user);
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: "@musereads_tracy7#",
  callbacks: {
    async jwt({ token, user }) {
      // first time jwt callback is run, user object is available
      if (user) {
        console.log(user, " token");
        token.user = user;
        token.id = user.id;
        token.role = user.role;
      }
      console.log(token, " default");
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.id = token.id;
      session.role = token.role;
      console.log(session, " default");
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, // 24hrs
  },
  jwt: {
    secret: "@musereads_tracy7#",
    encryption: true,
  },
  adapter: SequelizeAdapter(sequelize),
});

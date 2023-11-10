import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type User = {
  name: string
  email: string
  favorites: Array<string>
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        const { email, name } = credentials;
    
        return axios.post(`${apiUrl}/auth/login`, { email, name })
          .then((res) => {
            const user: User = { name: name, email: email, favorites: [] };
            return user;
          })
          .catch(e => console.error(e));
      }
    })
  ],
});

export { handler as GET, handler as POST };

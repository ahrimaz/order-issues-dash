import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // more providers here
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return typeof url === 'string' && url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  secret: process.env.AUTH_SECRET,
}

export default NextAuth(authOptions)
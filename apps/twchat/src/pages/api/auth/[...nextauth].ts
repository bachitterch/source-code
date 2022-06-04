import NextAuth from 'next-auth/next'
import Twitch from 'next-auth/providers/twitch'

async function refreshAccessToken(token: any) {
  const url =
    'https://id.twitch.tv/oauth2/token?' +
    new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID as string,
      client_secret: process.env.TWITCH_CLIENT_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string
    })
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  })

  const refreshedTokens = await response.json()

  if (!response.ok) {
    throw refreshedTokens
  }

  return {
    ...token,
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
  }
}

export default NextAuth({
  providers: [
    Twitch({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'openid channel:read:redemptions user:read:email chat:read chat:edit channel:moderate whispers:read whispers:edit user:read:follows moderator:manage:automod moderator:manage:banned_users user:read:subscriptions channel:read:hype_train channel:read:polls moderation:read'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user as any
      session.accessToken = token.accessToken as string
      session.error = token.error

      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'dark'
  }
})

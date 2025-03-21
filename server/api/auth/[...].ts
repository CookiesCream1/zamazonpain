import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'
import { useDbClient } from '~/composables/useDbClient'

export default NuxtAuthHandler({
  secret: process.env.auth_secret,
  providers: [
    // @ts-expect-error need .default here for SRR
    GoogleProvider.default({
      clientId: process.env.google_client_id,
      clientSecret: process.env.google_client_secret
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt ({ token, user, account }) {
      if (user) {
        const db = await useDbClient()
        const existingUser = await db.query(
          'SELECT user_id FROM users WHERE user_id = ?',
          [user.id]
        )
        if (existingUser.length === 0) {
          await db.query(
            'INSERT INTO users (user_id, email) VALUES (?, ?)',
            [user.id, user.email]
          )
        }
        db.end()
      }
      return {
        ...token,
        ...user,
        ...account
      }
    },
    async session ({ session, token }) {
      session.user = {
        ...session.user,
        ...token
      }

      const db = await useDbClient()
      const existingUser = await db.query(
        'SELECT user_id FROM users WHERE user_id = ?',
        [token.id]
      )
      if (existingUser.length === 0) {
        await db.query(
          'INSERT INTO users (user_id, email) VALUES (?, ?)',
          [token.id, token.email]
        )
      }
      db.end()
      return session
    }
  }
})

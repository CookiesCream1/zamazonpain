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
      const client = await useDbClient()
      let role = undefined
      if (client && user) {
        const userExists = await client.query('select user_id from users where users.user_id = ?;', user.id)
        if (userExists.length === 0) {
          await client.query('insert into users (user_id) values (?);', user.id)
        }
        role = await client.query('select * from users JOIN user_roles ON users.user_role = user_roles.role_id where users.user_id = ?;', user.id)
      }
      return {
        ...token,
        user: {...user, role: role},
        ...account,
      }
    },
    session ({ session, token }) {
      session.user = {
        ...session.user,
        ...token
      }

      return session
    }
  }
})

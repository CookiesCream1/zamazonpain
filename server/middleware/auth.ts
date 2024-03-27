import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (event.path.startsWith('/api/user') && !session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }
})

import { useUserInfoStore } from '~/data/UserInfo'

export default defineNuxtRouteMiddleware(async () => {
  const user = useUserInfoStore()
  if (await user.isAdmin()) {
    return
  }
  return abortNavigation('Not authorized')
})

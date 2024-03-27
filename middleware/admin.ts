export default defineNuxtRouteMiddleware(async () => {
  const role = await $fetch('/api/user/role')
  if (role === 'admin') {
    return
  }
  console.log(role)
  return abortNavigation('Not authorized')
})

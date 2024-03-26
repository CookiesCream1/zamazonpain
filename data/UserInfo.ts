export const useUserInfoStore = defineStore('UserInfo', {
  state: () => ({
    role: undefined,
    id: undefined
  }),
  actions: {
    async isAdmin () {
      const user = useAuthState()
      // @ts-expect-error
      if (this.role === undefined || this.id !== user.data.value?.user.id) {
        await this.getRole()
      }
      return this.role === 'admin'
    },
    async getRole () {
      const user = useAuthState()
      this.$patch({
        // @ts-expect-error
        role: await $fetch(`/api/db/${user.data.value.user.id}/role`),
        // @ts-expect-error
        id: user.data.value?.user.id
      })
    }
  }
})

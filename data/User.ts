import { defineStore } from 'pinia'

type user =
  | {
      tag: 'logged in';
      name: string;
      jwt: string;
    }
  | {
      tag: 'not logged in';
    };

export const useUserStore = defineStore({
  id: 'user',
  state: (): user => ({
    tag: 'not logged in'
  }),
  actions: {
    logout () {
      this.$reset()
    },
    async login () {
      const { signIn, data } = useAuth()
      await signIn('google')
      this.$patch({
        tag: 'logged in',
        name: data.value?.user?.email ?? '',
        jwt: data.value?.user?.image ?? ''
      })
    }
  }
})

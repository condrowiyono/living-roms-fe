<template>
  <div v-if="!loggedIn">
    <div class="w-full h-full flex flex-col items-center bg-gray-100 absolute">
      <div class="m-auto text-center w-64">
        <h1 class="text-2xl mb-8">
          Please sign in
        </h1>
        <form @submit.prevent="handleSubmit">
          <b-form-group>
            <b-form-input
              v-model="username"
              placeholder="Username"
            />
          </b-form-group>
          <b-form-group>
            <b-input
              v-model="password"
              type="password"
              placeholder="Password"
            />
          </b-form-group>
          <b-form-group>
            <b-button
              :disabled="isLogin"
              type="submit"
              variant="primary"
              class="w-full"
            >
              Login
            </b-button>
          </b-form-group>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      loggedIn: !!window.localStorage.getItem('token'),
      username: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin',
      loginError: 'auth/loginError',
      user: 'auth/user'
    })
  },
  created () {
    this.redirectedIfLoggedIn()
  },

  mounted () {
    this.redirectedIfLoggedIn()
  },

  updated () {
    this.redirectedIfLoggedIn()
  },

  methods: {
    ...mapActions({
      login: 'auth/LOGIN'
    }),

    redirectedIfLoggedIn () {
      if (this.loggedIn) {
        this.$router.replace('/in')
      }
    },

    async handleSubmit () {
      const payload = {
        username: this.username,
        password: this.password
      }
      await this.login(payload)
      if (!this.loginError) {
        this.$router.push('/in')
      }
    }
  }
}
</script>

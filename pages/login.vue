<template>
  <div v-if="!loggedIn">
    <div class="d-flex flex-column">
      <div class="text-center">
        <h1 class="mb-4">
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
            <b-form-input
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
import { BFormGroup, BFormInput, BButton } from 'bootstrap-vue'

export default {
  name: 'Login',
  components: {
    BFormGroup,
    BFormInput,
    BButton
  },

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
        this.$router.go({ path: '/in', force: true })
      }
    }
  }
}
</script>
